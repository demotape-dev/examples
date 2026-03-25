# DemoTape Example: Realtime / WebSocket

A local app you can run and share instantly with [DemoTape](https://demotape.dev). Open it on another device — phone, laptop — and inspect the session replay.

Proves that WebSocket connections survive proxying through DemoTape.

## What this proves
- WebSocket connections work through proxy
- Live updates are visible to testers
- Bidirectional communication works
- Replay captures realtime interactions

> **Try it**: This simulates sending your app to a client without deploying it.

## Stack
- React + Vite (frontend)
- Express + Socket.io (backend)

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
1. Open the shared link on another device — see a live chat room
2. Send messages — the viewer sees them appear instantly
3. Watch typing indicators and online user count update in real time
4. Server broadcasts periodic "system" messages — they appear on both ends
5. View the session replay to see every realtime interaction as it happened

## More examples
See all examples: https://demotape.dev/docs/examples

## About DemoTape
DemoTape lets you share a localhost app with others without deploying it. It supports multi-port development environments, preserves cookies and headers, and provides session replay so you can see exactly what users did. This example demonstrates WebSocket and realtime communication support.
