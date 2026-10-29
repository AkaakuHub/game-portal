# あかあくの遊び場

サムネイル付きのゲーム一覧と、プライバシーポリシー・お問い合わせをまとめるサイトです。

- `apps/portal/`：ポータル画面
- `games/suikomanaide/`：#吸い込まないでっのGitサブモジュール
- `games/star-getter/`：ラブゲッターのGitサブモジュール
- `shared/`：ゲーム登録情報と共通スタイル
- `scripts/`：開発・検査・ビルド
- `ops/systemd/`：開発サーバーのサービス定義

## 開発

Node.js24とpnpm11を使用します。

```sh
git submodule update --init --recursive
pnpm install
pnpm dev
```

```sh
pnpm check
pnpm build
```

ビルド結果は`dist/`へ出力します。連絡先は`contact@akaaku.net`です。

## Cloudflare Workersへの配信

- `https://game.akaaku.net/`：ゲーム一覧
- `https://game.akaaku.net/suikomanaide/`：#吸い込まないでっ
- `https://game.akaaku.net/star-getter/`：ラブゲッター

`akaaku.net`を管理するCloudflareアカウントで認証してから実行します。
APIトークンを使う場合は`CLOUDFLARE_API_TOKEN`を環境変数に設定します。

```sh
pnpm deploy:worker
```

ポータルと両ゲームをビルドし、1つのWorkerから静的ファイルを配信します。
カスタムドメインは`wrangler.jsonc`で管理します。

favicon・Apple Touch Icon・各ページのOGP画像は共通のSVGと日本語フォントから生成します。

## 自動反映

ポータルと各ゲームの`main`へのpushから、共通の`deploy.yml`を呼び出します。
両ゲームの最新の`main`と、そのcommitが参照する入れ子のsubmoduleを取得し、検査後にCloudflare Workersへデプロイします。
配信したcommitはActionsのログに記録されます。

CloudflareのGit連携は併用しません。
各repositoryのActionsには`CLOUDFLARE_API_TOKEN`のsecretと`CLOUDFLARE_ACCOUNT_ID`のvariableを設定します。
SSH鍵とrepositoryへの書き込み権限は使用しません。

ドキュメント・テストだけの変更やポータルのsubmodule参照だけの更新では、配信を起動しません。
CIではゲームごとの配信入力からビルドを識別し、変更のないゲームのビルド結果を再利用します。
ポータルだけを更新した場合も、ゲームの再ビルドは行いません。

## ゲームを追加する

ゲームを`games/`へsubmoduleとして追加し、`shared/games.ts`へ登録します。
一覧・開発用プロキシ・ビルド・キャッシュ・SEO・OGP・サイトメニューは、この登録情報から適用します。
ゲーム側のActionsは共通の`deploy.yml`を呼び出します。

サイトメニューはポータルが各ゲームへ共通で組み込みます。
ゲーム側は`portal-menu-open`で一時停止し、`portal-menu-close`で元の状態へ戻します。
準備ができた時点で`portal-menu-ready`を通知すると、開いているメニューの状態を受け取れます。
