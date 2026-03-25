import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const procs = [
  {
    name: 'api',
    cmd: 'npm',
    args: ['run', 'dev'],
    cwd: resolve(root, 'apps/api'),
    color: '\x1b[36m', // cyan
  },
  {
    name: 'web',
    cmd: 'npm',
    args: ['run', 'dev'],
    cwd: resolve(root, 'apps/web'),
    color: '\x1b[35m', // magenta
  },
];

const reset = '\x1b[0m';

for (const p of procs) {
  const child = spawn(p.cmd, p.args, {
    cwd: p.cwd,
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: true,
  });

  const prefix = `${p.color}[${p.name}]${reset} `;

  child.stdout.on('data', (data) => {
    for (const line of data.toString().split('\n').filter(Boolean)) {
      console.log(prefix + line);
    }
  });

  child.stderr.on('data', (data) => {
    for (const line of data.toString().split('\n').filter(Boolean)) {
      console.error(prefix + line);
    }
  });

  child.on('close', (code) => {
    console.log(`${prefix}exited with code ${code}`);
  });
}

process.on('SIGINT', () => process.exit());
