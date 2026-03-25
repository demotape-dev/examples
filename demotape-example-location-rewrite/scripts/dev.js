const { spawn } = require("child_process");

function run(name, cwd) {
  const child = spawn("npm", ["run", "dev"], {
    cwd,
    stdio: "inherit",
    shell: true,
  });
  child.on("exit", (code) => {
    console.log(`${name} exited with code ${code}`);
  });
  return child;
}

run("api", "apps/api");
run("web", "apps/web");
