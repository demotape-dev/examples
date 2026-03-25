# DemoTape Example: React + Vite + Node API

A local app you can run and share instantly with [DemoTape](https://demotape.dev). Open it on another device — phone, laptop — and inspect the session replay.

Minimal local app for testing DemoTape with a real multi-port setup.

## What this proves
- Share a localhost app with others
- Frontend and backend on separate ports
- Real clicks and form activity
- Useful session replay in the DemoTape viewer

> **Try it**: This simulates sending your app to a client without deploying it.

## Stack
- React + Vite
- Node + Express

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
1. Open the shared link on another device — see a list of items from the API
2. Add a new item via the form — the viewer sees it appear in the list
3. Edit or delete items — each action is captured
4. View the session replay to see every click, form input, and API response

## More examples
See all examples: https://demotape.dev/docs/examples

## About DemoTape
DemoTape lets you share a localhost app with others without deploying it. It supports multi-port development environments, preserves cookies and headers, and provides session replay so you can see exactly what users did. This example demonstrates basic multi-port local development.
