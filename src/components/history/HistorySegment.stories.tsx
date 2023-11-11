import type { Meta, StoryObj } from '@storybook/react'
import { HistorySegment } from './HistorySegment'

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof HistorySegment> = {
  title: 'Compornent/History/HistorySegment',
  component: HistorySegment,
}

export default meta
type Story = StoryObj<typeof HistorySegment>

export const Default: Story = {
  args: {
    period: '高校生',
  },
}