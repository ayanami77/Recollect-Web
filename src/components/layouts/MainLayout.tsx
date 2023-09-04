import { FC, ReactNode } from 'react'
import { Menu } from '../common'
import { css } from '../../../styled-system/css'

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={css({ pt: '80px' })}>
      {children}
      <Menu />
    </div>
  )
}

export default MainLayout
