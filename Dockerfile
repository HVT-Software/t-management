ARG NODE_VERSION=20.9.0
FROM node:${NODE_VERSION}-alpine AS base
ENV PNPM_HOME="/pnpm" \
    PATH="$PNPM_HOME:$PATH" \
    NEXT_SHARP_PATH=/usr/local/lib/node_modules/sharp \
    NODE_OPTIONS="--max_old_space_size=4096"

RUN apk add --no-cache dumb-init
RUN corepack enable

ARG API_URL=http://localhost:9090/api
ARG NEXTAUTH_URL=http://localhost:3000/api/auth
ARG GOOGLE_CLIENT_ID
ARG GITHUB_ID
ARG DISCORD_CLIENT_ID
FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install -r --frozen-lockfile
RUN npm install -g --arch=x64 --platform=linux --libc=musl sharp

ENV API_URL=${API_URL} \
    NEXTAUTH_URL=${NEXTAUTH_URL} \
    NEXTAUTH_SECRET=${NEXTAUTH_SECRET} \
    GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID} \
    GOOGLE_SECRET=${GOOGLE_SECRET} \
    GITHUB_ID=${GITHUB_ID} \
    GITHUB_SECRET=${GITHUB_SECRET} \
    DISCORD_CLIENT_ID=${DISCORD_CLIENT_ID} \
    DISCORD_CLIENT_SECRET=${DISCORD_CLIENT_SECRET} \
    NEXT_TELEMETRY_DISABLED=1

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
    GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID} \
    GOOGLE_SECRET=${GOOGLE_SECRET} \
    GITHUB_ID=${GITHUB_ID} \
    GITHUB_SECRET=${GITHUB_SECRET} \
    DISCORD_CLIENT_ID=${DISCORD_CLIENT_ID} \
    DISCORD_CLIENT_SECRET=${DISCORD_CLIENT_SECRET} \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000

USER nextjs
EXPOSE 3000
CMD ["dumb-init", "node", "./server.js"]
