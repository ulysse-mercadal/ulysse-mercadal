#!/bin/sh
set -e

echo "⏳ Waiting for database to be ready..."
sleep 10

echo "🌱 Generating Prisma Client..."
npx prisma generate

echo "🔄 Running database migrations..."
npx prisma migrate deploy

echo "✅ Starting application..."
exec "$@"