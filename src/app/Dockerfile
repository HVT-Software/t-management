ARG NODE_VERSION=22.14.0
FROM node:${NODE_VERSION}-alpine AS base
ENV PNPM_HOME="/pnpm" \
    PATH="$PNPM_HOME:$PATH" \
    NEXT_SHARP_PATH=/usr/local/lib/node_modules/sharp

RUN apk add --no-cache dumb-init libc6-compat
RUN npm install -g corepack@latest
RUN corepack enable

ARG API_URL
ARG NEXTAUTH_URL
ARG NEXTAUTH_SECRET
ARG APP_PATH=apps/fumy-management
ARG RUNTIME_ENV
ARG SENTRY_DSN

FROM base AS builder
WORKDIR /app
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install -r --frozen-lockfile
RUN npm install -g --arch=x64 --platform=linux --libc=musl sharp

ENV API_URL=${API_URL} \
    NEXTAUTH_URL=${NEXTAUTH_URL} \
    NEXTAUTH_SECRET=${NEXTAUTH_SECRET} \
    NEXT_TELEMETRY_DISABLED=1 \
    NEXT_PUBLIC_RUNTIME_ENV=${RUNTIME_ENV} \
    NEXT_PUBLIC_SENTRY_DSN=${SENTRY_DSN} \
    NODE_OPTIONS="--max_old_space_size=4096"

RUN pnpm -F=fumy-management build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/${APP_PATH}/build/standalone ./
COPY --from=builder /app/${APP_PATH}/public ./${APP_PATH}/public
COPY --from=builder /app/${APP_PATH}/build/static ./${APP_PATH}/build/static
COPY --from=builder --chown=nextjs:nodejs /usr/local/lib/node_modules/sharp /usr/local/lib/node_modules/sharp
RUN chown -R nextjs:nodejs /app


ENV API_URL=${API_URL} \
    NEXTAUTH_URL=${NEXTAUTH_URL} \
    NEXTAUTH_SECRET=${NEXTAUTH_SECRET} \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=4400 \
    NEXT_PUBLIC_RUNTIME_ENV=${RUNTIME_ENV} \
    NEXT_PUBLIC_SENTRY_DSN=${SENTRY_DSN}

USER nextjs
EXPOSE 4400
CMD ["dumb-init", "node", "./apps/fumy-management/server.js"]