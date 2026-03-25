import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/config', (_req, res) => {
  res.json({
    theme: 'blue',
    title: 'My App',
    version: '1.0.0',
  });
});

app.get('/api/content', (_req, res) => {
  res.json({
    heading: 'Build something amazing',
    description:
      'A modern starter template to showcase live development with instant hot reload. Edit this text in apps/api/server.js and watch it update.',
    features: [
      {
        name: 'Hot Module Replacement',
        detail: 'Vite HMR updates components in-place without losing state.',
      },
      {
        name: 'API Live Reload',
        detail: 'Node --watch restarts the server on file changes automatically.',
      },
      {
        name: 'Proxy Setup',
        detail: 'Vite proxies /api requests to Express — single origin, zero CORS issues.',
      },
    ],
  });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
