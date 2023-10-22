# Recollect-Web

自分史作成アプリ「Recollect」のフロントエンドです。

## 技術スタック

**Recollect-Web**は主に以下の技術スタックで構成されています。

- Next.js - Pages Router
- TypeScript
- Panda CSS
- Framer Motion
- react-hook-form
- zod
- TanStack Query
- zustand
- swagger-typescript-api
- OpenAI API

また、テストライブラリとして次のものを利用しています。

- eslint
- Jest
- React Testing Library
- Storybook
- Playwright (e2eまでできたらしゅごい...)
- msw

## CI/CD

検討中(今のところ、Github ActionsでCIを回そうと思ってます)

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
pnpm generate:client
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
  - 基本、PRのテンプレートに沿って記入してください。（場合によっては内容の省略ok）
  - また、本プロジェクトではgithub projectsを利用してタスク管理を行っているので、それをもとにissueを立ててくれると嬉しいです。

## ユースケース図

![image](https://github.com/Seiya-Tagami/Recollect-Web/assets/125894090/9f1815e8-0c8b-46cd-8b2b-8d5992109832)

## ドメインモデル図

![image](https://github.com/Seiya-Tagami/Recollect-Web/assets/125894090/c94d009a-f24e-437e-8b39-14e70ac19691)
