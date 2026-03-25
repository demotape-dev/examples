# DemoTape Examples

Run real apps locally and share them with [DemoTape](https://demotape.dev). Each example is a working project you can run and share in under a minute.

## Start here (30 seconds)

**[demotape-example-react-vite-node](demotape-example-react-vite-node)** — React + Vite + Express API on separate ports, auto-detected and shared.

```bash
cd demotape-example-react-vite-node
npm run setup && npm run dev

# In another terminal:
npx @demotape.dev/cli
```

## Core features

Each example answers a specific question developers have before trying DemoTape.

| Example | What it proves |
|---------|---------------|
| [cookie-session](demotape-example-cookie-session) | Cookies survive proxying, `credentials: 'include'` works, auth headers forwarded |
| [location-rewrite](demotape-example-location-rewrite) | 302 redirects and Location headers work, client-side routing preserved |
| [auth-flow](demotape-example-auth-flow) | Login, JWT, protected routes all work behind proxy |
| [docker-compose](demotape-example-docker-compose) | Multi-container Docker environments work (React + Express + Postgres + Worker) |
| [realtime](demotape-example-realtime) | WebSocket connections survive proxying, live updates work |
| [debugging-failures](demotape-example-debugging-failures) | Session replay captures exact failure sequences — flaky bugs become reproducible |

## Frameworks

| Example | Framework |
|---------|-----------|
| [nextjs](demotape-example-nextjs) | Next.js 15 — SSR + API routes |
| [nextjs-auth](demotape-example-nextjs-auth) | Next.js 15 — Middleware + auth + protected routes |
| [sveltekit](demotape-example-sveltekit) | SvelteKit — non-React ecosystem |
| [nuxt](demotape-example-nuxt) | Nuxt 3 (Vue) — SSR + server routes |
| [api-only](demotape-example-api-only) | Express + Swagger UI — backend-only apps |

## Use cases

| Example | Scenario |
|---------|----------|
| [client-demo](demotape-example-client-demo) | Send a SaaS dashboard to a client, see what they clicked |
| [hot-reload](demotape-example-hot-reload) | Edit code while someone is using the shared link — they see changes instantly |

## Quick reference

| Question | Example |
|----------|---------|
| "Will cookies/auth break?" | cookie-session, auth-flow |
| "Will redirects work?" | location-rewrite |
| "Will multi-service setups work?" | docker-compose |
| "Is this actually useful?" | debugging-failures, client-demo |
| "Does it support my stack?" | nextjs, sveltekit, nuxt, api-only |
| "Will WebSockets work?" | realtime |
| "Can I keep developing while sharing?" | hot-reload |

## About DemoTape

DemoTape lets you share a localhost app with others without deploying it. It supports multi-port development environments, preserves cookies and headers, and provides session replay so you can see exactly what users did.

Learn more at [demotape.dev](https://demotape.dev) or read the [docs](https://demotape.dev/docs).
