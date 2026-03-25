import { useState, useEffect, useCallback } from "react";

export default function App() {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [staleCounter, setStaleCounter] = useState(0);
  const [realCounter, setRealCounter] = useState(0);

  // Fetch form config on mount
  useEffect(() => {
    fetch("/api/form-config")
      .then((r) => r.json())
      .then((data) => {
        setFields(data.fields);
        const initial = {};
        data.fields.forEach((f) => (initial[f.name] = ""));
        setFormData(initial);
      })
      .catch(() => setSubmitError("Failed to load form configuration"));
  }, []);

  // Fetch submissions
  const loadSubmissions = useCallback(() => {
    fetch("/api/submissions")
      .then((r) => r.json())
      .then(setSubmissions)
      .catch(() => {});
  }, []);

  useEffect(() => {
    loadSubmissions();
  }, [loadSubmissions]);

  // Stale data demo: realCounter increments, but staleCounter only
  // updates on a delayed interval (simulates UI state mismatch)
  useEffect(() => {
    const interval = setInterval(() => {
      setRealCounter((c) => c + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // staleCounter updates every 5 seconds — always behind
    const interval = setInterval(() => {
      setStaleCounter((c) => c + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const validate = () => {
    const newErrors = {};
    fields.forEach((field) => {
      const value = (formData[field.name] || "").trim();
      if (field.required && !value) {
        newErrors[field.name] = `${field.label} is required`;
      }
      if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        newErrors[field.name] = "Invalid email format";
      }
    });
    return newErrors;
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field on change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // No double-click prevention — intentional bug
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitResult(null);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `Server error (${res.status})`);
      }

      const data = await res.json();
      setSubmitResult(data);
      loadSubmissions();
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    await fetch("/api/submissions", { method: "DELETE" });
    setSubmissions([]);
    setSubmitResult(null);
  };

  const handleRetry = () => {
    setSubmitError(null);
    handleSubmit({ preventDefault: () => {} });
  };

  return (
    <div className="container">
      <header>
        <h1>Debugging Failures Demo</h1>
        <p className="subtitle">
          This form has intentional bugs. Submit it a few times and watch the failures.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="form">
        {fields.map((field) => (
          <div key={field.name} className="field">
            <label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={field.name}
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                rows={3}
              />
            ) : (
              <input
                id={field.name}
                type={field.type}
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
              />
            )}
            {errors[field.name] && (
              <span className="field-error">{errors[field.name]}</span>
            )}
          </div>
        ))}

        {/* No disabled-while-loading on purpose — allows double-click */}
        <button type="submit" className="submit-btn">
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {submitError && (
        <div className="error-banner">
          <strong>Error:</strong> {submitError}
          <button onClick={handleRetry} className="retry-btn">
            Retry
          </button>
        </div>
      )}

      {submitResult && (
        <div className="success-banner">
          Submitted successfully (ID: {submitResult.id})
        </div>
      )}

      <section className="stale-section">
        <h2>Stale Data Demo</h2>
        <p className="stale-info">
          These counters should match, but they don't — a classic UI state mismatch.
        </p>
        <div className="counters">
          <div className="counter">
            <span className="counter-label">Real counter</span>
            <span className="counter-value">{realCounter}</span>
          </div>
          <div className="counter">
            <span className="counter-label">Displayed counter</span>
            <span className="counter-value stale">{staleCounter}</span>
          </div>
        </div>
      </section>

      <section className="submissions-section">
        <div className="submissions-header">
          <h2>Submissions</h2>
          {submissions.length > 0 && (
            <button onClick={handleClear} className="clear-btn">
              Clear All
            </button>
          )}
        </div>
        {submissions.length === 0 ? (
          <p className="empty">No submissions yet.</p>
        ) : (
          <ul className="submissions-list">
            {submissions.map((s, i) => (
              <li key={i} className="submission-item">
                <span className="submission-id">#{s.id}</span>
                <span className="submission-name">{s.name}</span>
                <span className="submission-email">{s.email}</span>
                <span className="submission-time">
                  {new Date(s.timestamp).toLocaleTimeString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
