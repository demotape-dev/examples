# DemoTape Example: Next.js

A local app you can run and share instantly with [DemoTape](https://demotape.dev). Open it on another device — phone, laptop — and inspect the session replay.

Proves that Next.js SSR and API routes work correctly through DemoTape.

## What this proves
- Server-side rendering works through proxy
- API routes function correctly
- Cookies and headers preserved in SSR context
- Client and server components both work

> **Try it**: This simulates sending your app to a client without deploying it.

## Stack
- Next.js 15 (App Router)

## Local ports
- App: `3000`

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
1. Open the shared link on another device — the home page loads with a server-rendered item list (SSR)
2. Add items via the form — the viewer sees the API route called and the list updated
3. Navigate to the About page — client-side navigation works seamlessly
4. View the session replay to see SSR, API calls, and navigation all captured

## More examples
See all examples: https://demotape.dev/docs/examples

## About DemoTape
DemoTape lets you share a localhost app with others without deploying it. It supports multi-port development environments, preserves cookies and headers, and provides session replay so you can see exactly what users did. This example demonstrates Next.js SSR and API route support.
