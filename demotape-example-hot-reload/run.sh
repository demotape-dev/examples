#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

echo "==> Installing dependencies..."
npm run setup

echo "==> Starting API on :3000 and Web on :5173..."
npm run dev
