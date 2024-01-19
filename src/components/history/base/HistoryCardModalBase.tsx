import { Backdrop } from '@/components/common/partials/Backdrop'
import { css } from '../../../../styled-system/css'
import { FC, ReactNode } from 'react'
import { m } from 'framer-motion'

const fadeIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.1,
    },
  },
  exit: {
    opacity: 0,
  },
}

type HistoryCardModalBaseProps = {
  children: ReactNode
}
export const HistoryCardModalBase: FC<HistoryCardModalBaseProps> = (props) => {
  const { children } = props

  return (
    <Backdrop>
      <m.div
        className={css({
          width: '560px',
          px: '12px',
          md: {
            px: '0px',
          },
        })}
        onClick={(e) => e.stopPropagation()}
        variants={fadeIn}
      >
        <div
          className={css({
            width: 'full',
            bg: 'white',
            rounded: 'xl',
            px: '20px',
            py: '24px',
            md: {
              px: '32px',
            },
          })}
        >
          {children}
        </div>
      </m.div>
    </Backdrop>
  )
}
