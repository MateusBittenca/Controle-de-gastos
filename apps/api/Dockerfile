FROM node:22-alpine AS build
WORKDIR /repo
COPY package.json ./
COPY apps/api/package.json ./apps/api/
RUN cd apps/api && npm install
COPY apps/api ./apps/api
RUN cd apps/api && npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=build /repo/apps/api/package.json ./
COPY --from=build /repo/apps/api/node_modules ./node_modules
COPY --from=build /repo/apps/api/dist ./dist
EXPOSE 3000
ENV API_HOST=0.0.0.0
CMD ["node", "dist/index.js"]
