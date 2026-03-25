# DemoTape Example: API Only

A local app you can run and share instantly with [DemoTape](https://demotape.dev). Open it on another device — phone, laptop — and inspect the session replay.

Proves that DemoTape works for backend-only apps, not just frontends.

## What this proves
- API-only apps work with DemoTape
- Swagger UI is accessible through proxy
- REST endpoints function correctly
- Useful for backend developers sharing APIs

> **Try it**: This simulates sending your app to a client without deploying it.

## Stack
- Express
- Swagger UI Express

## Local ports
- API: `3000`

## Quick start
```bash
npm install
npm run dev
```

Then share it with DemoTape:

```bash
npx @demotape.dev/cli
```

1. Sign into DemoTape
2. Open the generated link on your phone or another computer
3. Interact with the app
4. View the session replay in the DemoTape dashboard

## Demo flow
1. Open the shared link on another device — Swagger UI loads at `/docs`
2. Try out the CRUD endpoints — the viewer creates, reads, updates, and deletes items
3. Watch the request/response cycle in the Swagger UI
4. View the session replay to see every API interaction the viewer performed

## More examples
See all examples: https://demotape.dev/docs/examples

## About DemoTape
DemoTape lets you share a localhost app with others without deploying it. It supports multi-port development environments, preserves cookies and headers, and provides session replay so you can see exactly what users did. This example demonstrates API-only application support.
