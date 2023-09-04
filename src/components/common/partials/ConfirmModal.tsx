import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { hstack, vstack } from '../../../../styled-system/patterns'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { css } from '../../../../styled-system/css'
import { FC } from 'react'
import { m } from 'framer-motion'
import { Backdrop } from './Backdrop'

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

// TODO: 必要なpropsは後で追加
type ConfirmModalProps = {
  content: {
    handleClose: () => void
  }
}
export const ConfirmModal: FC<ConfirmModalProps> = (props) => {
  const { content } = props
  return (
    <Backdrop onClick={content.handleClose}>
      <m.div
        className={vstack({
          bg: 'white',
          p: '24px',
          rounded: '3xl',
          alignItems: 'start',
          w: '600px',
          h: '280px',
          shadow: '2xl',
        })}
        onClick={(e) => e.stopPropagation()}
        variants={fadeIn}
      >
        <div className={hstack({ gap: '16px', pl: '8px' })}>
          <div>
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              style={{ width: '42px', height: '42px', color: '#c2da3c' }}
            />
          </div>
          <h2 className={css({ fontSize: '2xl', fontWeight: 'bold' })}>確認</h2>
        </div>
        <div className={css({ w: 'full', h: '4px', bg: 'lightgrey' })} />
        <div
          className={vstack({
            w: 'full',
            h: '180px',
            alignItems: 'start',
            justifyContent: 'space-between',
          })}
        >
          <div className={css({ mt: '12px', color: 'dimGray' })}>
            <p>本当に「タイトルです」を削除しますか？</p>
          </div>
          <div className={hstack({ gap: '24px', fontSize: 'md', fontWeight: 'bold', ml: 'auto' })}>
            <button
              className={hstack({
                bg: 'slate.100',
                px: '18px',
                py: '14px',
                rounded: 'xl',
                cursor: 'pointer',
                _hover: { bg: 'slate.200', transition: 'all 0.15s' },
              })}
              onClick={content.handleClose}
            >
              キャンセル
            </button>
            <button
              className={hstack({
                p: '16px',
                rounded: '2xl',
                color: 'cinnabar',
                cursor: 'pointer',
              })}
            >
              削除
            </button>
          </div>
        </div>
      </m.div>
    </Backdrop>
  )
}
