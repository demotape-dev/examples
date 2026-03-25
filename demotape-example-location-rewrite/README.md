# DemoTape Example: Location / URL Rewrite

A local app you can run and share instantly with [DemoTape](https://demotape.dev). Open it on another device — phone, laptop — and inspect the session replay.

Proves that redirects and client-side routing work correctly through DemoTape.

## What this proves
- Server redirects (302, Location headers) work correctly
- Client-side routing works when proxied
- Deep links work (e.g. `/dashboard/settings`)
- No broken navigation behind a proxy

> **Try it**: This simulates sending your app to a client without deploying it.

## Stack
- React + Vite + React Router (frontend)
- Express (API with redirects)

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
1. Open the shared link on another device — visit `/login` and see the login form
2. Submit credentials — the viewer sees a 302 redirect land on `/dashboard`
3. Navigate to `/dashboard/settings` via deep link — routing works seamlessly
4. Visit a protected route without auth — the viewer is redirected back to `/login`
5. View the session replay to see every redirect and navigation step

## More examples
See all examples: https://demotape.dev/docs/examples

## About DemoTape
DemoTape lets you share a localhost app with others without deploying it. It supports multi-port development environments, preserves cookies and headers, and provides session replay so you can see exactly what users did. This example demonstrates redirect and URL rewriting behavior.
