import './index.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import Layout from './layout'
import { queryClient } from '@/api/clients/tanstackQueryClient'
import { QueryClientProvider } from '@tanstack/react-query'
const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={inter.className}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </QueryClientProvider>
  )
}
