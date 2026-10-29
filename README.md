# ゲームポータル

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
