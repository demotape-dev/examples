import { useState, useEffect } from 'react';

const THEME_COLORS = {
  blue: '#4f6ef7',
  green: '#10b981',
  purple: '#8b5cf6',
  orange: '#f59e0b',
};

export default function App() {
  const [config, setConfig] = useState(null);
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/config').then((r) => r.json()),
      fetch('/api/content').then((r) => r.json()),
    ])
      .then(([cfg, cnt]) => {
        setConfig(cfg);
        setContent(cnt);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <div className="center">
        <p className="error">
          Failed to load API data: {error}
          <br />
          Make sure the API is running on port 3000.
        </p>
      </div>
    );
  }

  if (!config || !content) {
    return (
      <div className="center">
        <p className="loading">Loading...</p>
      </div>
    );
  }

  const accent = THEME_COLORS[config.theme] || THEME_COLORS.blue;

  return (
    <div className="app">
      <div className="banner">
        Try editing <code>apps/web/src/App.jsx</code> or{' '}
        <code>apps/api/server.js</code> — changes appear instantly!
      </div>

      <header className="header">
        <div className="header-inner">
          <span className="header-title" style={{ color: accent }}>
            {config.title}
          </span>
          <span className="header-version">v{config.version}</span>
        </div>
      </header>

      <section className="hero">
        <h1 className="hero-heading" style={{ color: accent }}>
          {content.heading}
        </h1>
        <p className="hero-description">{content.description}</p>
      </section>

      <section className="features">
        {content.features.map((f, i) => (
          <div className="feature-card" key={i}>
            <div className="feature-dot" style={{ background: accent }} />
            <h3 className="feature-name">{f.name}</h3>
            <p className="feature-detail">{f.detail}</p>
          </div>
        ))}
      </section>

      <footer className="footer">
        <p>
          Powered by{' '}
          <span style={{ color: accent, fontWeight: 600 }}>Vite HMR</span> +{' '}
          <span style={{ color: accent, fontWeight: 600 }}>
            node --watch
          </span>
        </p>
      </footer>
    </div>
  );
}
