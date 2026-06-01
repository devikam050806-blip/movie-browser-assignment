const path = require("path");
const { spawn } = require("child_process");

const script = process.argv[2];
const allowedScripts = ["build", "start", "test", "eject"];

if (!allowedScripts.includes(script)) {
  console.error(`Unknown react-scripts command: ${script}`);
  process.exit(1);
}

const reactScript = path.join(
  __dirname,
  "..",
  "node_modules",
  "react-scripts",
  "scripts",
  `${script}.js`
);

const nodeOptions = [process.env.NODE_OPTIONS, "--openssl-legacy-provider"]
  .filter(Boolean)
  .join(" ");

const child = spawn(process.execPath, [reactScript, ...process.argv.slice(3)], {
  env: {
    ...process.env,
    NODE_OPTIONS: nodeOptions,
  },
  stdio: "inherit",
});

child.on("exit", (code) => {
  process.exit(code);
});
