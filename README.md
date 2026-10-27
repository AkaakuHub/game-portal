# ゲームポータル

Vite+でゲーム一覧と個別ゲームを配信する親リポジトリです。`main`に統合し、ゲームは`games/`配下のGitサブモジュールで管理します。外部リモートと公開先はまだ設定していません。

## 構成

```text
apps/portal/       一覧・プライバシーポリシー・お問い合わせ
apps/portal/public/thumbnails/  実際のゲーム画面のサムネイル
shared/            ゲーム登録情報と内部共通スタイル
scripts/           開発・検査・統合ビルド
ops/systemd/       テイルネット用の開発サービス
games/suikomanai/  #吸い込まないでっのサブモジュール
```

ゲーム本体は別リポジトリです。現在は隣の`../suikomanai`をローカルの取得元として使い、親にはゲームの参照コミットだけを記録します。外部リモートを作成した後は、`.gitmodules`のURLを取得元に合わせて更新します。

## 開発

Node.js22.18以降とpnpm11を使用します。通常の開発環境ではNode.js24を使用します。

```sh
pnpm install
pnpm dev
```

通常は`http://127.0.0.1:4174/`で一覧、`/suikomanai/`でゲームを開きます。ゲームの開発サーバーも起動し、同じオリジンでプロキシします。ゲームの左上のボタンから一覧へ戻れます。

テイルネットでは`game-portal-live.service`を使い、`http://100.77.108.76:4173/`と既存のHTTPS転送先から開きます。サービス定義は`ops/systemd/game-portal-live.service`です。

```sh
pnpm dev --host 100.77.108.76 --port 4173 --strictPort
```

## 検査とビルド

```sh
pnpm check
pnpm build
pnpm preview
```

ポータルと登録済みの全ゲームを検査します。静的ファイルは`dist/`にまとめ、`index.html`、`privacy/index.html`、`contact/index.html`、`suikomanai/index.html`を出力します。ゲームの配信パスはビルド時のViteのbaseで指定します。

プライバシーポリシーと連絡先はポータルだけに置きます。連絡先は`contact@akaaku.net`です。ゲーム一覧のサムネイルは実際のリザルト画面を撮影した画像です。

将来Cloudflareへ公開する際は、この統合済み`dist/`を静的配信先へ配置します。現在はnoindexを設定し、デプロイ・DNS・公開認証の設定は行っていません。

## ゲームの更新

ゲーム側で変更をコミットし、親でサブモジュールの参照を更新します。

```sh
git -c protocol.file.allow=always submodule update --remote games/suikomanai
git add games/suikomanai
git commit
```

新しいゲームは`games/`へサブモジュールとして追加し、`shared/games.ts`にslug・表示名・サムネイル・ディレクトリ・開発ポートを登録します。共通化が必要になったソースは`shared/`へ置きます。公開npmライブラリは作りません。
