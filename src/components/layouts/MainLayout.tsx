import { FC, ReactNode } from 'react'
import { Menu } from '../common'

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      {children}
      <Menu />
    </>
  )
}

export default MainLayout
