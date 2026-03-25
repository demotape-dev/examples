# DemoTape Example: Next.js with Auth

A local app you can run and share instantly with [DemoTape](https://demotape.dev). Open it on another device — phone, laptop — and inspect the session replay.

Proves that Next.js middleware and auth flows work correctly through DemoTape.

## What this proves
- Next.js middleware works through proxy
- Protected routes with server-side redirects
- Session handling in SSR context
- Cookie-based auth with httpOnly cookies

> **Try it**: This simulates sending your app to a client without deploying it.

## Stack
- Next.js 15 (App Router + Middleware)

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
1. Open the shared link on another device — visit `/dashboard` and get redirected to `/login` by middleware
2. Login with demo/demo credentials — the viewer sees the auth cookie set
3. Access protected dashboard, settings, and profile pages — content loads correctly
4. Logout — the viewer is redirected back to the landing page
5. View the session replay to see middleware redirects and the full auth lifecycle

## More examples
See all examples: https://demotape.dev/docs/examples

## About DemoTape
DemoTape lets you share a localhost app with others without deploying it. It supports multi-port development environments, preserves cookies and headers, and provides session replay so you can see exactly what users did. This example demonstrates Next.js middleware and authentication flow support.
