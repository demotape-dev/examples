# DemoTape Example: Hot Reload

A local app you can run and share instantly with [DemoTape](https://demotape.dev). Open it on another device — phone, laptop — and inspect the session replay.

Proves that live development changes are reflected instantly for viewers.

## What this proves
- Vite HMR works through DemoTape proxy
- Dev changes reflect in real-time
- Tester sees updates without refreshing
- Real development workflow captured

> **Try it**: This simulates sending your app to a client without deploying it.

## Stack
- React + Vite (frontend with HMR)
- Express (API)

## Local ports
- Web: `5173`
- API: `3000`

## Quick start
```bash
npm run setup
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
1. Open the shared link on another device — see a styled component
2. Developer edits the component (change color, text, layout) — the viewer sees changes appear instantly via Vite HMR
3. API data can also be updated restart-free with node --watch — the viewer sees fresh data
4. View the session replay to see the live development workflow as the viewer experienced it

## More examples
See all examples: https://demotape.dev/docs/examples

## About DemoTape
DemoTape lets you share a localhost app with others without deploying it. It supports multi-port development environments, preserves cookies and headers, and provides session replay so you can see exactly what users did. This example demonstrates live hot reload during development.
