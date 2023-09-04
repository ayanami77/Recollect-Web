import { m } from 'framer-motion'
import { FC, ReactNode } from 'react'
import { css } from '../../../../styled-system/css'

type BackdropProps = {
  children: ReactNode
  onClick: () => void
}

export const Backdrop: FC<BackdropProps> = (props) => {
  const { children, onClick } = props
  return (
    <m.div
      className={css({
        pos: 'absolute',
        top: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        w: '100%',
        h: '100%',
        bg: '#000000c0',
      })}
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </m.div>
  )
}
