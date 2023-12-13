import { Footer, Header } from '@/components/common'
import { FC, ReactNode } from 'react'
import { css } from '../../../styled-system/css'

// const notesansjp = Noto_Sans_JP({ subsets: ['latin'] })

const GlobalLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className={css({ mt: '80px', md: { mt: '100px' } })}>{children}</main>
      <Footer />
    </div>
  )
}

export default GlobalLayout
