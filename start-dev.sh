#!/bin/bash

echo "🚀 Starting Polaris Youth Platform Development Environment"

# Check if PostgreSQL is running
if ! pg_isready -h localhost -p 5432 -U postgres 2>/dev/null; then
  echo "📊 Starting PostgreSQL..."
  brew services start postgresql@14
  sleep 3
fi

# Check if database exists
if ! psql -h localhost -U postgres -lqt | cut -d \| -f 1 | grep -qw polaris_youth_dev; then
  echo "📚 Creating database..."
  createdb -h localhost -U postgres polaris_youth_dev
fi

echo "✅ Database ready!"

# Install dependencies if needed
if [ ! -d "frontend/node_modules" ]; then
  echo "📦 Installing frontend dependencies..."
  cd frontend && npm install && cd ..
fi

if [ ! -d "cms/node_modules" ]; then
  echo "📦 Installing CMS dependencies..."
  cd cms && npm install && cd ..
fi

# Start services
echo "🎬 Starting development servers..."
echo "🌐 Frontend: http://localhost:3000"
echo "🎛️  CMS Admin: http://localhost:1337/admin"

# Start both services concurrently
npm run dev