#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

echo "==> Installing dependencies..."
npm install

trap 'kill 0' EXIT

echo "==> Starting backend on :3001..."
node server.js &

echo "==> Starting frontend on :5173..."
npx vite
