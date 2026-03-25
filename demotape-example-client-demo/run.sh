#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

echo "==> Installing dependencies..."
npm install

echo "==> Starting dev server on :5173..."
npm run dev
