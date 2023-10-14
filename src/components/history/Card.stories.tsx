// YourComponent.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react'

import { Card } from './Card'

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Card> = {
  title: 'Compornent/Card',
  component: Card,
}

export default meta
type Story = StoryObj<typeof Card>

export const HasAnalysis: Story = {
  args: {
    data: {
      id: '0',
      period: '高校生',
      title: '文系でも化学部が楽しかった話!',
      content:
        '毎週、教科書で出てくるような有名な実験から面白い実験まで色々なことをしていました...',
      tags: ['実験好き', 'チームワーク', '計画的'],
      createdAt: '2023-09-01T12:14:57.548Z',
      updatedAt: '2023-09-01T12:14:57.548Z',
    },
  },
}

export const NoAnalysis: Story = {
  args: {
    data: {
      id: '0',
      period: '高校生',
      title: '文系でも化学部が楽しかった話!',
      content:
        '毎週、教科書で出てくるような有名な実験から面白い実験まで色々なことをしていました...',
      tags: [],
      createdAt: '2023-09-01T12:14:57.548Z',
      updatedAt: '2023-09-01T12:14:57.548Z',
    },
  },
}
