document.addEventListener("portal-return-request", () => {
  if (window.confirm("ゲーム一覧へ戻りますか？")) window.location.assign("/");
});
