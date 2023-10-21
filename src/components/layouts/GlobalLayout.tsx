import { Footer, Header } from '@/components/common'
import { Noto_Sans_JP } from 'next/font/google'
import { FC, ReactNode } from 'react'
import { css } from '../../../styled-system/css'

// TODO: フォント変えてみたいかもだけど、大丈夫なんかなこれ？next/fontきついかも
// const inter = Inter({ subsets: ['latin'] })
const notesansjp = Noto_Sans_JP({ subsets: ['latin'] })

const GlobalLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={notesansjp.className}>
      <Header />
      <main className={css({ mt: '80px', md: { mt: '120px' } })}>{children}</main>
      <Footer />
    </div>
  )
}

export default GlobalLayout
