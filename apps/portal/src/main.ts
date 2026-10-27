import "./styles/portal.css";
import { renderShell } from "./shell";
import { games } from "../../../shared/games";

renderShell();

const list = document.querySelector("#games");
if (!list) throw new Error("ゲーム一覧を表示できません。");
for (const game of games) {
  const item = document.createElement("li");
  const link = document.createElement("a");
  link.className = "game";
  link.href = `/${game.slug}/`;
  const image = document.createElement("img");
  image.src = game.thumbnail;
  image.alt = "";
  image.width = 960;
  image.height = 540;
  image.decoding = "async";
  const title = document.createElement("span");
  title.textContent = game.title;
  link.append(image, title);
  item.append(link);
  list.append(item);
}
