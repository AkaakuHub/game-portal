function link(label: string, href: string) {
  const anchor = document.createElement("a");
  anchor.textContent = label;
  anchor.href = href;
  return anchor;
}
export function renderShell() {
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");
  if (!header || !footer) throw new Error("ページを表示できません。");
  const home = link("game.akaaku.net", "/");
  home.className = "home";
  header.append(home);
  const nav = document.createElement("nav");
  nav.setAttribute("aria-label", "サイト情報");
  nav.append(link("プライバシーポリシー", "/privacy/"), link("お問い合わせ", "/contact/"));
  footer.append(nav);
}
