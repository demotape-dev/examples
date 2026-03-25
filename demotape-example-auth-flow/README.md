# DemoTape Example: Auth Flow

A local app you can run and share instantly with [DemoTape](https://demotape.dev). Open it on another device — phone, laptop — and inspect the session replay.

Proves that authentication flows work correctly behind a DemoTape proxy.

## What this proves
- Login works behind a proxy
- JWT tokens persist across requests
- Cookies are preserved
- Protected routes behave correctly
- Logout clears auth state

> **Try it**: This simulates sending your app to a client without deploying it.

## Stack
- React + Vite (frontend)
- Express (API with JWT)

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
1. Open the shared link on another device — see the landing page with "Login as demo user" button
2. Click login — the viewer sees a JWT token stored and cookie set
3. Access protected `/profile` and `/settings` pages — content loads correctly
4. Try accessing protected pages without login — the viewer is redirected
5. Logout — token cleared, back to landing
6. View the session replay to see the full auth lifecycle from login to logout

## More examples
See all examples: https://demotape.dev/docs/examples

## About DemoTape
DemoTape lets you share a localhost app with others without deploying it. It supports multi-port development environments, preserves cookies and headers, and provides session replay so you can see exactly what users did. This example demonstrates full authentication flow preservation.
