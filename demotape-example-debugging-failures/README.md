# DemoTape Example: Debugging Failures

A local app you can run and share instantly with [DemoTape](https://demotape.dev). Open it on another device — phone, laptop — and inspect the session replay.

Proves why DemoTape exists — replay helps debug real issues that are hard to reproduce.

## What this proves
- Session replay captures exact failure sequences
- Flaky bugs become reproducible
- UI state mismatches are visible in replay
- Testers don't need to write detailed bug reports

> **Try it**: This simulates sending your app to a client without deploying it.

## Stack
- React + Vite (frontend)
- Express (API with intentional failures)

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
1. Open the shared link on another device — fill out the form and trigger validation errors
2. Submit the form — the viewer hits a random 500 error (flaky API simulation)
3. Retry — a slow response triggers a 3s timeout simulation
4. Some fields show stale data — the viewer sees a UI state mismatch
5. Double-click submit — a race condition creates duplicate entries
6. View the session replay to see the exact sequence of failures without needing a bug report

## Included failure scenarios
- Form validation errors
- Random 500 errors (simulated flaky API)
- Timeout / slow responses
- Missing field bugs
- UI state mismatches
- Race conditions (double submit)

## More examples
See all examples: https://demotape.dev/docs/examples

## About DemoTape
DemoTape lets you share a localhost app with others without deploying it. It supports multi-port development environments, preserves cookies and headers, and provides session replay so you can see exactly what users did. This example demonstrates how session replay makes debugging real-world failures trivial.
