FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx tsx bin/console.ts build
WORKDIR /app/build
RUN npm ci --omit=dev
EXPOSE 3333
CMD ["sh", "-c", "node ace.js migration:run --force && node bin/server.js"]
