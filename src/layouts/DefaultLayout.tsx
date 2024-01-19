import { Header } from '@/components/common'
import { Noto_Sans_JP } from 'next/font/google'
import { FC, ReactNode } from 'react'
import { css } from '../../styled-system/css'

const noteSansJP = Noto_Sans_JP({ subsets: ['latin'] })

const DefaultLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={noteSansJP.className}>
      <Header />
      <main className={css({ mt: '80px', md: { mt: '100px' } })}>{children}</main>
    </div>
  )
}

export default DefaultLayout
