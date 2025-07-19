FROM node:24-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Build

FROM base AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml /app/
RUN pnpm install --frozen-lockfile

COPY . /app
RUN pnpm build

# Production

FROM base

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist/server/index.js /app/server.js
COPY --from=builder /app/dist/web /app/static

ENV STATIC_DIR="/app/static"
ENV NODE_ENV=production

EXPOSE 3000
CMD [ "node", "/app/server.js" ]
