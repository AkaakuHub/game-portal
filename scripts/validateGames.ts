import { resolve } from "node:path";
import { validateGames } from "./lib/validateGames.ts";

validateGames(resolve(import.meta.dirname, ".."));
console.log("ゲームの登録と共通配信への接続を確認しました。");
