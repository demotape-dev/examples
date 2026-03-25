const { spawn } = require("child_process");
const path = require("path");

const root = path.resolve(__dirname, "..");

const procs = [
  {
    name: "api",
    cmd: "node",
    args: ["server.js"],
    cwd: path.join(root, "apps", "api"),
    color: "\x1b[36m", // cyan
  },
  {
    name: "web",
    cmd: "npx",
    args: ["vite"],
    cwd: path.join(root, "apps", "web"),
    color: "\x1b[35m", // magenta
  },
];

const reset = "\x1b[0m";

for (const proc of procs) {
  const child = spawn(proc.cmd, proc.args, {
    cwd: proc.cwd,
    stdio: ["ignore", "pipe", "pipe"],
    shell: true,
  });

  const prefix = `${proc.color}[${proc.name}]${reset}`;

  child.stdout.on("data", (data) => {
    for (const line of data.toString().split("\n")) {
      if (line.trim()) console.log(`${prefix} ${line}`);
    }
  });

  child.stderr.on("data", (data) => {
    for (const line of data.toString().split("\n")) {
      if (line.trim()) console.error(`${prefix} ${line}`);
    }
  });

  child.on("exit", (code) => {
    console.log(`${prefix} exited with code ${code}`);
  });
}

process.on("SIGINT", () => process.exit());
process.on("SIGTERM", () => process.exit());
