import './index.css'
import type { AppProps } from 'next/app'
import { queryClient } from '@/api/clients/queryClient'
import { QueryClientProvider } from '@tanstack/react-query'
import GlobalLayout from '@/components/layouts/GlobalLayout'
import { LazyMotion, domAnimation } from 'framer-motion'
import { SessionProvider } from 'next-auth/react'

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'

// mswの起動
if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../api/msw')
}

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <LazyMotion features={domAnimation}>
          <GlobalLayout>
            <Component {...pageProps} />
          </GlobalLayout>
        </LazyMotion>
      </QueryClientProvider>
    </SessionProvider>
  )
}
