import './index.css'
import type { AppProps } from 'next/app'
import { queryClient } from '@/api/clients/queryClient'
import { QueryClientProvider } from '@tanstack/react-query'
import DefaultLayout from '@/layouts/DefaultLayout'
import { LazyMotion, domAnimation } from 'framer-motion'
import { SessionProvider } from 'next-auth/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'

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
          <DefaultLayout>
            <Component {...pageProps} />
            <SpeedInsights />
            <Analytics />
          </DefaultLayout>
        </LazyMotion>
      </QueryClientProvider>
    </SessionProvider>
  )
}
