import './index.css'
import type { AppProps } from 'next/app'
import { queryClient } from '@/api/clients/tanstackQueryClient'
import { QueryClientProvider } from '@tanstack/react-query'
import GlobalLayout from '@/components/layouts/GlobalLayout'
import { LazyMotion, domAnimation } from 'framer-motion'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <LazyMotion features={domAnimation}>
        <GlobalLayout>
          <Component {...pageProps} />
        </GlobalLayout>
      </LazyMotion>
    </QueryClientProvider>
  )
}
