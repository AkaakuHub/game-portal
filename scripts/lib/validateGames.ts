import { existsSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { games } from "../../shared/games.ts";

export function validateGames(root: string): void {
  const slugs = new Set<string>();
  const ports = new Set<number>([4174]);
  const directories = new Set<string>();
  for (const game of games) {
    if (
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(game.slug) ||
      ["privacy", "contact", "assets", "og"].includes(game.slug)
    )
      throw new Error(`ゲームのURL名が正しくありません: ${game.slug}`);
    if (slugs.has(game.slug) || ports.has(game.port) || directories.has(game.directory))
      throw new Error(`ゲームの登録が重複しています: ${game.slug}`);
    if (!Number.isInteger(game.port) || game.port < 1024 || game.port > 65535)
      throw new Error(`開発用ポートが正しくありません: ${game.slug}`);
    if (game.directory !== `games/${game.slug}` || !game.title.trim() || !game.description.trim())
      throw new Error(`ゲームの登録情報が正しくありません: ${game.slug}`);
    if (
      !game.thumbnail.startsWith("/thumbnails/") ||
      game.thumbnail.includes("..") ||
      !existsSync(resolve(root, "apps/portal/public", `.${game.thumbnail}`))
    )
      throw new Error(`サムネイルがありません: ${game.slug}`);
    if (!existsSync(resolve(root, game.directory, "package.json")))
      throw new Error(`ゲームを初期化してください: ${game.directory}`);
    const path = execFileSync(
      "git",
      ["config", "--file", ".gitmodules", "--get", `submodule.${game.directory}.path`],
      { cwd: root, encoding: "utf8" },
    ).trim();
    if (path !== game.directory) throw new Error(`submoduleの登録が一致しません: ${game.slug}`);
    const workflow = resolve(root, game.directory, ".github/workflows/portal.yml");
    if (
      !existsSync(workflow) ||
      !readFileSync(workflow, "utf8").includes(
        "uses: AkaakuHub/game-portal/.github/workflows/deploy.yml@main",
      )
    )
      throw new Error(`共通Actionsへ接続してください: ${game.slug}`);
    slugs.add(game.slug);
    ports.add(game.port);
    directories.add(game.directory);
  }
}
