FROM node:22-bookworm-slim

WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY server.cjs contact-endpoint.cjs ./
USER node

EXPOSE 4000
CMD ["node", "server.cjs"]
