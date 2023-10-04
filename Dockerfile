FROM node:12.22.3-alpine3.11 AS base

FROM base AS deps

WORKDIR /app
 
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS build

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npm run build

FROM base AS runtime

LABEL "author.name"="Said Rodrigues" \
"author.email"="coderflemis@gmail.com" \
version="1.0.0" desc="Site Institucional da CEOS em NextJS"

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S gabrigas -u 1001

COPY --from=deps --chown=gabrigas:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=gabrigas:nodejs /app/dist/ .

USER gabrigas
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]