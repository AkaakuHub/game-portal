import "./styles/portal.css";
import { games } from "../../../shared/games";

const list = document.querySelector("#games");
if (!list) throw new Error("ゲーム一覧を表示できません。");
for (const game of games) {
  const item = document.createElement("li");
  const link = document.createElement("a");
  link.className = "game";
  link.href = `/${game.slug}/`;
  link.textContent = game.title;
  item.append(link);
  list.append(item);
}
