FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN node ace.js build
WORKDIR /app/build
RUN npm ci --omit=dev
EXPOSE 3333
CMD ["node", "bin/server.js"]
