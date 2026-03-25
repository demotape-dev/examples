const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const POLL_INTERVAL = 5000;
const PROCESSING_TIME = 2000;

async function processPendingTasks() {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT * FROM tasks WHERE status = 'pending' ORDER BY created_at ASC"
    );

    if (result.rows.length === 0) {
      return;
    }

    console.log(`Found ${result.rows.length} pending task(s)`);

    for (const task of result.rows) {
      console.log(`Processing task #${task.id}: "${task.title}"`);

      // Simulate processing work
      await new Promise((resolve) => setTimeout(resolve, PROCESSING_TIME));

      await client.query(
        "UPDATE tasks SET status = 'completed', processed_at = NOW() WHERE id = $1",
        [task.id]
      );

      console.log(`Completed task #${task.id}`);
    }
  } catch (err) {
    console.error('Error processing tasks:', err);
  } finally {
    client.release();
  }
}

async function main() {
  console.log('Worker started — polling for pending tasks every 5s');

  // Wait for the tasks table to exist (API creates it on startup)
  let ready = false;
  while (!ready) {
    try {
      await pool.query('SELECT 1 FROM tasks LIMIT 1');
      ready = true;
    } catch {
      console.log('Waiting for tasks table...');
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  console.log('Tasks table found — beginning work loop');

  while (true) {
    await processPendingTasks();
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL));
  }
}

main().catch((err) => {
  console.error('Worker failed:', err);
  process.exit(1);
});
