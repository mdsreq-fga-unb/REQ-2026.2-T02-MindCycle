# Construído a partir da raiz do monorepo: docker compose --profile api up --build
FROM node:22-alpine AS build
WORKDIR /repo
RUN npm install -g npm@11.21.2

# Manifestos, schema do Prisma e pacote compartilhado: o postinstall da raiz
# compila o shared e gera o client do Prisma.
COPY package.json package-lock.json ./
COPY apps/app/package.json apps/app/
COPY apps/api/package.json apps/api/prisma7.config.ts apps/api/
COPY apps/api/prisma apps/api/prisma
COPY packages/shared packages/shared
RUN npm ci -w @mindcycle/api -w @mindcycle/shared --include-workspace-root

COPY apps/api apps/api
WORKDIR /repo/apps/api
RUN npm run build

FROM node:22-alpine
ENV NODE_ENV=production
WORKDIR /repo
COPY --from=build /repo/node_modules node_modules
COPY --from=build /repo/packages/shared packages/shared
COPY --from=build /repo/apps/api apps/api
WORKDIR /repo/apps/api
USER node
EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]
