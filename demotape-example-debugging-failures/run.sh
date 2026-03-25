#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"

echo "Installing dependencies..."
npm run setup

echo ""
echo "Starting dev servers..."
npm run dev
