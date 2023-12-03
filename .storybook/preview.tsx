import type { Preview } from '@storybook/react'
import "../src/pages/index.css";
import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query'
import React from 'react';

export const queryClient = new QueryClient()

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      )
    },
  ]
}

export default preview
