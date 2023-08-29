import { Header } from '@/components/common'
import { FC, ReactNode } from 'react'

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}

export default Layout
