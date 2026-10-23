# Serveur Next.js (standalone) avec /api/google-reviews : les avis Google
# se rafraîchissent en direct, contrairement à l’export GitHub Pages.

FROM node:22-bookworm-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM node:22-bookworm-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# NEXT_PUBLIC_* est inliné dans le JS client au build
ARG NEXT_PUBLIC_ANALYTICS_URL
ENV DOCKER=true \
    NEXT_TELEMETRY_DISABLED=1 \
    NEXT_PUBLIC_ANALYTICS_URL=$NEXT_PUBLIC_ANALYTICS_URL
# « next build » direct : pas de prebuild (scrape) ici, le serveur rafraîchit
# les avis lui-même au premier appel d’/api/google-reviews.
RUN npx next build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000 \
    PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

# Playwright n’est pas tracé dans standalone (lancé via child_process) :
# on le copie et on n’installe que chromium-headless-shell (~100 Mo).
COPY --from=deps /app/node_modules/playwright ./node_modules/playwright
COPY --from=deps /app/node_modules/playwright-core ./node_modules/playwright-core
RUN node node_modules/playwright/cli.js install --with-deps --only-shell chromium \
    && rm -rf /var/lib/apt/lists/* /root/.cache

COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/scripts ./scripts
COPY --from=builder --chown=node:node /app/data ./data

USER node
EXPOSE 3000
CMD ["node", "server.js"]
