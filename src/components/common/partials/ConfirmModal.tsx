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

type ConfirmModalProps = {
  content: {
    onCancel: () => void
    onConfirm: () => void
    cancelMessage: string
    confirmMessage: string
    message: string
  }
}
export const ConfirmModal: FC<ConfirmModalProps> = (props) => {
  const { content } = props
  return (
    <Backdrop onClick={() => false}>
      <m.div
        className={css({
          w: '540px',
          px: '12px',
          md: {
            px: '0px',
          },
        })}
        onClick={(e) => e.stopPropagation()}
        variants={fadeIn}
      >
        <div
          className={vstack({
            alignItems: 'start',
            p: '24px',
            bg: 'white',
            rounded: 'xl',
            shadow: '2xl',
          })}
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
              h: '140px',
              alignItems: 'start',
              justifyContent: 'space-between',
            })}
          >
            <div className={css({ mt: '4px' })}>
              <p>{content.message}</p>
            </div>
            <div
              className={hstack({ gap: '24px', fontSize: 'md', fontWeight: 'bold', ml: 'auto' })}
            >
              <button
                className={hstack({
                  bg: 'slate.100',
                  px: '18px',
                  py: '14px',
                  color: 'black',
                  rounded: 'lg',
                  cursor: 'pointer',
                  _hover: { bg: 'slate.200', transition: 'all 0.15s' },
                })}
                onClick={content.onCancel}
              >
                {content.cancelMessage}
              </button>
              <button
                className={hstack({
                  p: '16px',
                  rounded: 'lg',
                  color: 'cinnabar',
                  cursor: 'pointer',
                })}
                onClick={content.onConfirm}
              >
                {content.confirmMessage}
              </button>
            </div>
          </div>
        </div>
      </m.div>
    </Backdrop>
  )
}
