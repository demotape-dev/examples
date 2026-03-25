# DemoTape Example: SvelteKit

A local app you can run and share instantly with [DemoTape](https://demotape.dev). Open it on another device — phone, laptop — and inspect the session replay.

Proves that SvelteKit apps work correctly through DemoTape.

## What this proves
- Non-React frameworks work with DemoTape
- SvelteKit server and client routing both work
- Server load functions (SSR) work through proxy
- API endpoints function correctly

> **Try it**: This simulates sending your app to a client without deploying it.

## Stack
- SvelteKit

## Local ports
- App: `5173`

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
1. Open the shared link on another device — the home page loads with server-rendered data
2. Add items via the form — the viewer sees the list update
3. Navigate to the About page — client-side routing works seamlessly
4. View the session replay to see every interaction and page transition

## More examples
See all examples: https://demotape.dev/docs/examples

## About DemoTape
DemoTape lets you share a localhost app with others without deploying it. It supports multi-port development environments, preserves cookies and headers, and provides session replay so you can see exactly what users did. This example demonstrates SvelteKit framework compatibility.
