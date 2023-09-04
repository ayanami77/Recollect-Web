import { Header } from '@/components/common'
import { Inter } from 'next/font/google'
import { FC, ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

const GlobalLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={inter.className}>
      <Header />
      <main>{children}</main>
    </div>
  )
}

export default GlobalLayout
