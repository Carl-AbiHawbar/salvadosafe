import { rmSync, existsSync } from "node:fs";
import { join } from "node:path";
import { execSync, spawn } from "node:child_process";

const CACHE_DIRS = [".next", "node_modules/.cache/salvado-next"];
const PORTS = [3000, 3001];

function killPort(port) {
  try {
    const out = execSync(`netstat -ano | findstr :${port}`, { encoding: "utf8" });
    const pids = new Set();
    for (const line of out.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed.includes("LISTENING")) continue;
      const pid = trimmed.split(/\s+/).pop();
      if (pid && /^\d+$/.test(pid)) pids.add(pid);
    }
    for (const pid of pids) {
      try {
        execSync(`taskkill /F /PID ${pid}`, { stdio: "ignore" });
        console.log(`Stopped process ${pid} on port ${port}`);
      } catch {
        // Process already exited
      }
    }
  } catch {
    // Nothing listening on this port
  }
}

function removeDir(dir) {
  if (!existsSync(dir)) return;
  try {
    rmSync(dir, { recursive: true, force: true });
    console.log(`Removed ${dir}`);
  } catch {
    console.log(`Could not remove ${dir} (close other dev servers and retry)`);
  }
}

function removeTraceFiles() {
  for (const dir of CACHE_DIRS) {
    for (const file of ["dev/trace", "dev/lock", "trace"]) {
      const target = join(dir, file);
      if (!existsSync(target)) continue;
      try {
        rmSync(target, { recursive: true, force: true });
      } catch {
        // Ignore locked files; full clean may be needed
      }
    }
  }
}

const fullClean = process.argv.includes("--clean");

for (const port of PORTS) killPort(port);

if (fullClean) {
  for (const dir of CACHE_DIRS) removeDir(dir);
} else {
  removeTraceFiles();
}

const child = spawn("npx", ["next", "dev", "--webpack"], {
  stdio: "inherit",
  shell: true,
  env: {
    ...process.env,
    NEXT_TELEMETRY_DISABLED: "1",
  },
});

child.on("exit", (code) => process.exit(code ?? 0));
