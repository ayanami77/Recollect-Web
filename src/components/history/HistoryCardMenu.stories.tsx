import type { Meta, StoryObj } from '@storybook/react'
import { HistoryCardMenu } from './HistoryCardMenu'

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof HistoryCardMenu> = {
  title: 'Compornent/History/HistoryCardMenu',
  component: HistoryCardMenu,
}

export default meta
type Story = StoryObj<typeof HistoryCardMenu>

export const Default: Story = {
  args: {
    data: {
      id: '0',
      period: '0',
      title: '文系でも化学部が楽しかった話!',
      content:
        'プログラミングサークルの活動の一環として秋に新歓活動を行いました。新勧プロジェクトと称して、どのように人を集めるのか、広報の手法、新メンバー歓迎イベントなどを話し合い、一つ一つ実行していきました。自分にとっては不慣れなインスタグラムを使って、自ら進んでサークルの活動の様子を宣伝したり、サークルのメンバーにも協力を促したりしてなんとか新歓活動を進めていきました。最終的には新しいメンバーに入ってもらえたのでほっとしていました。',
      tags: ['実験好き', 'チームワーク', '計画的'],
      createdAt: '2023-09-01T12:14:57.548Z',
      updatedAt: '2023-09-01T12:14:57.548Z',
    },
  },
}
