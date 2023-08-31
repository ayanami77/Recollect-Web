# Recollect-Web

- vercel deploy  
  https://recollect-web-ten.vercel.app/

## セットアップ

1. モジュールをインストール

```sh
pnpm i
```

2. プロジェクトの起動

```sh
pnpm run dev
```

3. huskyの準備

```sh
pnpx husky install
```

4. pandacssのstyled-systemフォルダが無い場合

```sh
pnpm prepare
```

## 作業の流れ

本プロジェクトでは、github projectsを使用しタスク管理を行いたいと思います。

1. まずprojectsにおいて、TableまたはBoardからタスクを切ります。その際、`convert to issue`を押してレポジトリを選択すると、自動的にissueが立ちます。
2. develop からブランチを切ります。その際、ブランチ名は`feature/作業内容-名前`とします。例えば、`feature/create-card-component-seiya`みたいな感じ。
3. 作業が終わったら、add, commit, push でリモートに送ります。

- コミットメッセージに prefix を付けよう。
  - `feat:` .. 何か機能を実装した時
  - `update:` .. 機能やスタイルは変わらず、実装を更新した時
  - `wip:` .. 作業は途中だが一旦 push しておきたい時
  - `refac:` .. リファクタリング時
  - `fix:` .. 機能のバグの修正時
  - `chore:` .. ライブラリや補助ツールを導入したい時など
  - `docs:` .. ドキュメントの更新時

4. PR を作ります。その際、issueと結びつけることを忘れずに。
