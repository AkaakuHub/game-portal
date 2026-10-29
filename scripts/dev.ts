import { validateGames } from "./lib/validateGames.ts";
import { spawn } from "node:child_process";
import { resolve } from "node:path";
import { games } from "../shared/games.ts";

const root = resolve(import.meta.dirname, "..");
validateGames(root);
const tasks = [
  { cwd: root, args: ["exec", "vp", "dev", ...process.argv.slice(2)] },
  ...games.map((game) => ({
    cwd: resolve(root, game.directory),
    args: [
      "exec",
      "vp",
      "dev",
      "--host",
      "127.0.0.1",
      "--port",
      String(game.port),
      "--strictPort",
      "--base",
      `/${game.slug}/`,
    ],
  })),
];
const children = tasks.map((task) => spawn("pnpm", task.args, { cwd: task.cwd, stdio: "inherit" }));
const stop = () => {
  for (const child of children) child.kill("SIGTERM");
};
process.once("SIGINT", stop);
process.once("SIGTERM", stop);
for (const child of children) {
  child.once("error", (error) => {
    console.error(error.message);
    process.exitCode = 1;
    stop();
  });
  child.once("exit", (code) => {
    if (code) process.exitCode = code;
    stop();
  });
}
