# DemoTape Example: Client Demo

A local app you can run and share instantly with [DemoTape](https://demotape.dev). Open it on another device — phone, laptop — and inspect the session replay.

Proves the real use case of sending a live demo to a client.

## What this proves
- Real use case: share a demo with clients
- Viewer shows exactly what they clicked
- Navigation and interactions are captured
- No deployment needed for client reviews

> **Try it**: This simulates sending your app to a client without deploying it.

## Stack
- React + Vite

## Local ports
- Web: `5173`

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
1. Open the shared link on another device — browse the SaaS dashboard as a client would
2. Navigate between pages (Overview, Analytics, Settings) — each transition is captured
3. Edit data, toggle settings — the viewer's exact interactions are recorded
4. View the session replay to see precisely what the client clicked, scrolled, and explored

## More examples
See all examples: https://demotape.dev/docs/examples

## About DemoTape
DemoTape lets you share a localhost app with others without deploying it. It supports multi-port development environments, preserves cookies and headers, and provides session replay so you can see exactly what users did. This example demonstrates the client demo use case.
