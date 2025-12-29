# 1. Install all dependencies
FROM node:20-alpine AS deps

WORKDIR /app
COPY package.json package-lock.json ./
COPY front/package.json ./front/
COPY api/package.json ./api/

RUN npm install

# 2. Build the backend
FROM node:20-alpine AS builder

# For prisma
RUN apk add --no-cache openssl openssl-dev libc6-compat

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build --workspace=api

# 3. Production image
FROM node:20-alpine

# For prisma
RUN apk add --no-cache openssl openssl-dev libc6-compat

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/api/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/api/package.json .
COPY --from=builder /app/api/prisma ./prisma
COPY --from=builder /app/api/entrypoint.sh .
RUN chmod +x ./entrypoint.sh

EXPOSE 3001

ENTRYPOINT ["./entrypoint.sh"]
CMD ["npm", "run", "start:prod"]