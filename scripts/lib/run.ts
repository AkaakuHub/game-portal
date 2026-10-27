import { spawnSync } from "node:child_process";

interface Command {
  cwd: string;
  args: string[];
}
export function run(commands: readonly Command[]) {
  for (const command of commands) {
    const result = spawnSync("pnpm", command.args, { cwd: command.cwd, stdio: "inherit" });
    if (result.error) throw result.error;
    if (result.status !== 0) process.exit(result.status ?? 1);
  }
}
