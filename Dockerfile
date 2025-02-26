ARG NODE_VERSION=20.14.0
FROM node:${NODE_VERSION}-alpine AS base
ENV PNPM_HOME="/pnpm" \
    PATH="$PNPM_HOME:$PATH" \
    NEXT_SHARP_PATH=/usr/local/lib/node_modules/sharp \
    NODE_OPTIONS="--max_old_space_size=4096"

RUN apk add --no-cache dumb-init
RUN npm install -g corepack@latest
RUN corepack enable

ARG API_URL=https://staging-man-api.hvantoan.io.vn/api
ARG NEXTAUTH_URL=http://localhost:3000/api/auth
ARG NEXTAUTH_SECRET=593c3acd23d92d6cf83ffa7a940233ce702f9f911d2540e4ceedc3e1cbe52614
ARG RUNTIME_ENV=development

FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install -r --frozen-lockfile
RUN pnpm install -g --arch=x64 --platform=linux --libc=musl sharp

ENV API_URL=${API_URL} \
    NEXTAUTH_URL=${NEXTAUTH_URL} \
    NEXTAUTH_SECRET=${NEXTAUTH_SECRET} \
    NEXT_TELEMETRY_DISABLED=1 \
    NEXT_PUBLIC_RUNTIME_ENV=${RUNTIME_ENV}

RUN pnpm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/build/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/build/static ./build/static
COPY --from=builder --chown=nextjs:nodejs /usr/local/lib/node_modules/sharp /usr/local/lib/node_modules/sharp

RUN chown -R nextjs:nodejs /app

ENV API_URL=${API_URL} \
    NEXTAUTH_URL=${NEXTAUTH_URL} \
    NEXTAUTH_SECRET=${NEXTAUTH_SECRET} \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000 \
    NEXT_PUBLIC_RUNTIME_ENV=${RUNTIME_ENV}

USER nextjs
EXPOSE 3000
