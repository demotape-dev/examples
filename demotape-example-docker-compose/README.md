# DemoTape Example: Docker Compose Multi-Service

A local app you can run and share instantly with [DemoTape](https://demotape.dev). Open it on another device — phone, laptop — and inspect the session replay.

Proves that DemoTape works with realistic Docker Compose development environments.

## What this proves
- Works with multi-container Docker environments
- Multiple services, multiple ports
- No special DemoTape configuration needed
- Database-backed workflows work correctly
- Background workers function properly

> **Try it**: This simulates sending your app to a client without deploying it.

## Stack
- React + Vite (frontend)
- Express (API)
- PostgreSQL (database)
- Node.js worker (background jobs)

## Local ports
- Web: `5173`
- API: `3000`

## Quick start
```bash
docker compose up --build
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
1. Open the shared link on another device — see a task board
2. Create a new task — the viewer sees it stored in PostgreSQL
3. Watch the worker pick up the task and process it — status updates appear live
4. View the session replay to see real database persistence and background processing in action

## More examples
See all examples: https://demotape.dev/docs/examples

## About DemoTape
DemoTape lets you share a localhost app with others without deploying it. It supports multi-port development environments, preserves cookies and headers, and provides session replay so you can see exactly what users did. This example demonstrates Docker Compose multi-service environments.
