import { rmSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";

const CACHE_DIRS = [".next", "node_modules/.cache/salvado-next"];
const PORTS = [3000, 3001, 3002];

for (const port of PORTS) {
  try {
    const out = execSync(`netstat -ano | findstr :${port}`, { encoding: "utf8" });
    for (const line of out.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed.includes("LISTENING")) continue;
      const pid = trimmed.split(/\s+/).pop();
      if (pid && /^\d+$/.test(pid)) {
        try {
          execSync(`taskkill /F /PID ${pid}`, { stdio: "ignore" });
        } catch {
          // ignore
        }
      }
    }
  } catch {
    // port free
  }
}

for (const dir of CACHE_DIRS) {
  if (existsSync(dir)) {
    try {
      rmSync(dir, { recursive: true, force: true });
      console.log(`Removed ${dir}`);
    } catch {
      console.log(`Could not remove ${dir}`);
    }
  }
}
