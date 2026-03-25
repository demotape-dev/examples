#!/bin/bash
set -e

echo "==> Installing dependencies..."
npm install

echo "==> Starting Next.js dev server on port 3000..."
npm run dev
