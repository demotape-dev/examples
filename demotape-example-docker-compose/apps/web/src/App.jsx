import { useState, useEffect, useCallback } from 'react';

const STATUS_COLORS = {
  pending: '#f59e0b',
  completed: '#10b981',
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch('/api/tasks');
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const data = await res.json();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
    const interval = setInterval(fetchTasks, 3000);
    return () => clearInterval(interval);
  }, [fetchTasks]);

  const createTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), description: description.trim() }),
      });
      if (!res.ok) throw new Error('Failed to create task');
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete task');
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.heading}>Task Board</h1>
        <p style={styles.subtitle}>
          Docker Compose multi-service example &mdash; React + Express + PostgreSQL + Worker
        </p>
      </header>

      {error && <div style={styles.error}>{error}</div>}

      <form onSubmit={createTask} style={styles.form}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Add Task
        </button>
      </form>

      <div style={styles.info}>
        Tasks with status <strong>pending</strong> are automatically picked up by the background
        worker and marked <strong>completed</strong> after processing.
      </div>

      {loading ? (
        <p style={styles.loadingText}>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p style={styles.emptyText}>No tasks yet. Create one above.</p>
      ) : (
        <div style={styles.taskList}>
          {tasks.map((task) => (
            <div key={task.id} style={styles.taskCard}>
              <div style={styles.taskHeader}>
                <span style={styles.taskTitle}>{task.title}</span>
                <span
                  style={{
                    ...styles.statusBadge,
                    backgroundColor: STATUS_COLORS[task.status] || '#6b7280',
                  }}
                >
                  {task.status}
                </span>
              </div>
              {task.description && <p style={styles.taskDescription}>{task.description}</p>}
              <div style={styles.taskFooter}>
                <span style={styles.taskTime}>
                  Created: {new Date(task.created_at).toLocaleTimeString()}
                </span>
                {task.processed_at && (
                  <span style={styles.taskTime}>
                    Processed: {new Date(task.processed_at).toLocaleTimeString()}
                  </span>
                )}
                <button onClick={() => deleteTask(task.id)} style={styles.deleteButton}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 640,
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#1a1a2e',
  },
  header: {
    marginBottom: 32,
  },
  heading: {
    fontSize: 28,
    fontWeight: 700,
    margin: '0 0 4px',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    margin: 0,
  },
  error: {
    padding: '10px 14px',
    marginBottom: 16,
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    borderRadius: 8,
    fontSize: 14,
  },
  form: {
    display: 'flex',
    gap: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    padding: '10px 12px',
    fontSize: 14,
    border: '1px solid #d1d5db',
    borderRadius: 8,
    outline: 'none',
  },
  button: {
    padding: '10px 20px',
    fontSize: 14,
    fontWeight: 600,
    color: '#fff',
    backgroundColor: '#4f46e5',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  info: {
    padding: '10px 14px',
    marginBottom: 24,
    backgroundColor: '#f0f9ff',
    color: '#1e40af',
    borderRadius: 8,
    fontSize: 13,
    lineHeight: 1.5,
  },
  loadingText: {
    textAlign: 'center',
    color: '#6b7280',
  },
  emptyText: {
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: 14,
  },
  taskList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  taskCard: {
    padding: '14px 16px',
    border: '1px solid #e5e7eb',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  taskHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  taskTitle: {
    fontWeight: 600,
    fontSize: 15,
  },
  statusBadge: {
    fontSize: 11,
    fontWeight: 600,
    color: '#fff',
    padding: '2px 10px',
    borderRadius: 12,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  taskDescription: {
    fontSize: 13,
    color: '#6b7280',
    margin: '4px 0 8px',
  },
  taskFooter: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  taskTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  deleteButton: {
    marginLeft: 'auto',
    padding: '4px 12px',
    fontSize: 12,
    color: '#dc2626',
    backgroundColor: 'transparent',
    border: '1px solid #fca5a5',
    borderRadius: 6,
    cursor: 'pointer',
  },
};

export default App;
