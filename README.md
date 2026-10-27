# ゲームポータル

Vite+を使うローカル開発用のポータルです。外部リモートと公開先は設定していません。開発サーバーとプレビューは127.0.0.1で待ち受けます。robots設定はnoindexにしています。

ゲームはgames/配下のGitサブモジュールで管理し、親リポジトリに参照コミットを記録します。現在はローカルの../cosmic-goをgames/suikomanaiとして登録しています。リモートを作成する際には.gitmodulesのURLを実際のゲームリポジトリへ変更します。

## 構成

```text
apps/portal/       一覧画面とポータル固有のスタイル
games/             ゲーム別リポジトリのサブモジュール
shared/games.ts    ゲームの登録情報
shared/styles/     内部で共有するCSS
scripts/           開発・検査・統合ビルド
dist/              統合した静的ファイル
```

共通コードを別のnpmライブラリとして公開しません。ポータル固有のUIはapps/portalに置き、複数のゲームで使う処理だけをsharedへ移します。

## 開発

Node.js22.18以降とpnpm11を使用します。ゲームと共通の開発環境ではNode.js24を使用します。

```sh
git -c protocol.file.allow=always submodule update --init --recursive
pnpm install
pnpm dev
```

http://127.0.0.1:4174/で一覧、/suikomanai/でゲームを開きます。ゲーム用サーバーも同時に起動します。既存のテイルネット用サーバーは変更しません。

## 検査とビルド

```sh
pnpm check
pnpm build
pnpm preview
```

登録情報にあるすべてのゲームとポータルを検査します。ビルド結果はdist/index.htmlとdist/suikomanai/index.htmlにまとめます。ゲームの公開パスはビルド時のViteのbaseで指定し、ゲーム単体の開発設定は維持します。

公開するときは統合済みのdistをCloudflareの静的配信先に指定する構成です。現時点では公開・DNS設定・デプロイ用認証を行っていません。

## 追加と更新

ゲームの登録情報はshared/games.tsに置きます。新しいゲームはgames/配下へサブモジュールとして追加し、slug、表示名、ディレクトリ、開発ポートを登録します。

ゲーム側の変更をコミットした後、親側でサブモジュールの参照を更新してコミットします。現在のローカル構成では次のコマンドで既存ゲームの最新コミットを取得できます。

```sh
git -c protocol.file.allow=always submodule update --remote games/suikomanai
git add games/suikomanai
```

ローカルのゲームリポジトリを使う開発環境だけでprotocol.file.allowを指定します。GitHubなどのリモートへ切り替えた後は通常のsubmoduleコマンドを使います。
