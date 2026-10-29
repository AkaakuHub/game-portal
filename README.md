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
