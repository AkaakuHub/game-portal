import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { games } from "../shared/games.ts";

const root = resolve(import.meta.dirname, "..");
const tasks = [
  { cwd: root, args: ["exec", "vp", "build"] },
  ...games.map((game) => ({
    cwd: resolve(root, game.directory),
    args: [
      "exec",
      "vp",
      "build",
      "--base",
      `/${game.slug}/`,
      "--outDir",
      resolve(root, "dist", game.slug),
      "--emptyOutDir",
    ],
  })),
];
for (const task of tasks) {
  const result = spawnSync("pnpm", task.args, { cwd: task.cwd, stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
