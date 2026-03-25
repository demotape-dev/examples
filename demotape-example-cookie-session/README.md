# DemoTape Example: Cookie Session

A local app you can run and share instantly with [DemoTape](https://demotape.dev). Open it on another device — phone, laptop — and inspect the session replay.

Proves that cookies and auth headers survive proxying through DemoTape.

## What this proves
- Cookies survive proxying
- `credentials: 'include'` works correctly
- Auth/session cookies are preserved across requests
- Headers like `Authorization` are forwarded

> **Try it**: This simulates sending your app to a client without deploying it.

## Stack
- React + Vite (frontend)
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
1. Open the shared link on another device — no session cookie set
2. Click "Start session" — the viewer sees the API set an httpOnly cookie
3. Visit `/me` — cookie + auth header info appears on screen
4. View the session replay to see the exact transition from no cookie to cookie set

## More examples
See all examples: https://demotape.dev/docs/examples

## About DemoTape
DemoTape lets you share a localhost app with others without deploying it. It supports multi-port development environments, preserves cookies and headers, and provides session replay so you can see exactly what users did. This example demonstrates cookie and header preservation.
