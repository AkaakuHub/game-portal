import styles from "./styles/gameNavigation.css?inline";
import { escapeHtml, site } from "../../../shared/site.ts";

const host = document.createElement("aside");
const shadow = host.attachShadow({ mode: "open" });
shadow.innerHTML = `<style>${styles}</style>
  <button class="launcher" type="button" aria-label="サイトメニューを開く" aria-expanded="false" aria-controls="site-menu">メニュー</button>
  <dialog id="site-menu" aria-labelledby="site-menu-title">
    <header><h2 id="site-menu-title">${escapeHtml(site.name)}</h2><button class="close" type="button">閉じる</button></header>
    <nav aria-label="サイト"><a href="/">ゲーム一覧へ戻る</a></nav>
  </dialog>`;
const launcher = shadow.querySelector<HTMLButtonElement>(".launcher");
const close = shadow.querySelector<HTMLButtonElement>(".close");
const dialog = shadow.querySelector<HTMLDialogElement>("dialog");
const home = shadow.querySelector<HTMLAnchorElement>("a");
if (!launcher || !close || !dialog || !home) throw new Error("サイトメニューを表示できません。");
launcher.addEventListener("click", () => {
  document.dispatchEvent(new Event("portal-menu-open"));
  dialog.showModal();
  launcher.setAttribute("aria-expanded", "true");
});
close.addEventListener("click", () => dialog.close());
dialog.addEventListener("close", () => {
  document.dispatchEvent(new Event("portal-menu-close"));
  launcher.setAttribute("aria-expanded", "false");
});
home.addEventListener("click", (event) => {
  if (!window.confirm("ゲーム一覧へ戻りますか？")) event.preventDefault();
});
shadow.addEventListener("keydown", (event) => {
  if (dialog.open || (event instanceof KeyboardEvent && ["Enter", " "].includes(event.key)))
    event.stopPropagation();
});
document.addEventListener("portal-menu-ready", () => {
  if (dialog.open) document.dispatchEvent(new Event("portal-menu-open"));
});
document.body.append(host);
