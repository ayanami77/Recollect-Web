import { FC, ReactNode } from 'react'
import { css } from '../../../../styled-system/css'

type ContentsWrapper = {
  children: ReactNode
}
export const ContentsWrapper: FC<ContentsWrapper> = ({ children }) => {
  return <div className={css({ px: '16px', pb: '32px' })}>{children}</div>
}
