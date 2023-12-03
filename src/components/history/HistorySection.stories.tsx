import type { Meta, StoryObj } from '@storybook/react'
import { HistorySection } from './HistorySection'

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof HistorySection> = {
  title: 'Compornent/History/HistorySection',
  component: HistorySection,
}

export default meta
type Story = StoryObj<typeof HistorySection>

export const Default: Story = {
  args: {
    period: '1',
  },
}
