# Recollect-Web

自分史作成アプリ「Recollect」のフロントエンドです。

## アプリ概要

就活生のための自分史作成とそこから自己の特性をAIで分析できるサービスです。
以下の機能を提供しています。

- 幼少期から現在にかけて時系列で自分史を整理出来る機能。
- 新規ユーザーのための、チュートリアル機能。
- 自分史の内容に基づいて、自己の特性をAIで分析できる機能。

## 主な技術スタック

- Next.js - Pages Router
- TypeScript
- Panda CSS
- react-hook-form
- zod
- TanStack Query
- zustand

## 環境構築

1. `node_modules`をインストール

```sh
pnpm i
```

2. `.env.example`をコピーして、`.env`をルート直下に置いてください。

```sh
cp .env.example .env
```

3. アプリケーションの起動

```sh
pnpm run dev
```

3. huskyの準備

```sh
pnpx husky install
```

4. Panda CSSの`styled-system`が無い場合

```sh
pnpm prepare
```

## openapi.yamlからTSの型を生成する

次のコマンドを打ってください。

```sh
pnpm codegen
```

## Storybook

Storybookは以下のコマンドで立ち上がります。

```sh
pnpm storybook
```

## 作業時の注意

- コミットメッセージには prefix を付けよう。
  - `feat:` .. 何か機能を実装した時
  - `update:` .. 機能やスタイルは変わらず、実装を更新した時
  - `wip:` .. 作業は途中だが一旦 push しておきたい時
  - `refac:` .. リファクタリング時
  - `fix:` .. 機能のバグの修正時
  - `chore:` .. ライブラリや補助ツールを導入したい時など
  - `docs:` .. ドキュメントの更新時
- PR作成時
  - 基本、PRのテンプレートに沿って記入してください。
  - また、本プロジェクトではgithub projectsを利用してタスク管理を行っているので、それをもとにissueを立ててくれると嬉しいです。

## ユースケース図

![image](https://github.com/Seiya-Tagami/Recollect-Web/assets/125894090/9f1815e8-0c8b-46cd-8b2b-8d5992109832)

## ドメインモデル図

![image](https://github.com/Seiya-Tagami/Recollect-Web/assets/125894090/c94d009a-f24e-437e-8b39-14e70ac19691)
