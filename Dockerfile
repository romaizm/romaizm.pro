# syntax=docker/dockerfile:1

# Stage 1: Builder
FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# Stage 2: Runner
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Next's file tracer copies @swc/helpers into the standalone output inconsistently
# (grabs package.json but not the interop source files), causing a runtime
# "Cannot find module '@swc/helpers/.../_interop_require_default'" crash.
# Copy the full package explicitly so every variant (cjs + esm) is present.
COPY --from=builder /app/node_modules/@swc/helpers ./node_modules/@swc/helpers

# Ensure the runtime cache dir exists and is writable by the nextjs user
# (Next writes optimized images and prerender/segment cache here at runtime)
RUN mkdir -p /app/.next/cache && chown -R nextjs:nodejs /app/.next

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
