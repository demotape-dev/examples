# DemoTape Examples

**DemoTape gives developers a public URL for their localhost app — in one command.** No deploy, no staging server, no Docker push. Run `demotape` in your project directory, and your local dev server gets a shareable link that anyone can open in their browser. Cookies, WebSockets, multi-port setups, and hot reload all work out of the box.

**Every viewer session is recorded.** DemoTape captures clicks, scrolls, console errors, and network requests as they happen. When a client says "it broke," you don't have to guess — you replay the exact session and see what they saw, down to the pixel. Sessions are viewable live or on-demand from your dashboard.

**These examples prove it works with real stacks.** Each project below is a complete app you can run and share in under a minute. They cover authentication flows, WebSockets, SSR frameworks, multi-service Docker setups, and more. Pick the one closest to your stack, run it, and see DemoTape in action before using it on your own projects.

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
| [microservices](demotape-example-microservices) | 4 services (React + API + WebSocket + Worker) shared through one URL |
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
| "Will multi-service setups work?" | docker-compose, microservices |
| "Is this actually useful?" | debugging-failures, client-demo |
| "Does it support my stack?" | nextjs, sveltekit, nuxt, api-only |
| "Will WebSockets work?" | realtime |
| "Can I keep developing while sharing?" | hot-reload |

## Get started

```bash
npm install -g @demotape.dev/cli
demotape login
cd your-project && demotape
```

Learn more at [demotape.dev](https://demotape.dev).
