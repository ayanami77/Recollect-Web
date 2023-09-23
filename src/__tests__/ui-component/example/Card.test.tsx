//TODO: JestでのUIコンポーネントテストはやめて、Storybookを導入する予定
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Card } from '@/components/history'

describe('Card', () => {
  test('propsで渡した値の表示', () => {
    render(
      <Card
        data={{
          id: '11111',
          period: '現在まで',
          title: 'タイトル',
          content: '内容',
          tags: [],
          createdAt: '2023/09/14',
          updatedAt: '2023/09/14',
        }}
      />,
    )
    expect(screen.getByText('タイトル')).toBeInTheDocument()
    expect(screen.getByText('内容')).toBeInTheDocument()
  })
})
