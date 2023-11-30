import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { hstack } from '../../../../styled-system/patterns'
import { css } from '../../../../styled-system/css'
import { m, AnimatePresence } from 'framer-motion'
import { FC } from 'react'

type ToastProps = {
  content: {
    status: string
    message: string
    isShow: boolean
  }
}
export const Toast: FC<ToastProps> = (props) => {
  const { content } = props
  return (
    <AnimatePresence>
      {content.isShow && (
        <div
          className={css({
            position: 'fixed',
            top: '0',
            right: '0',
            zIndex: 100,
            md: {
              top: '24px',
              right: '24px',
            },
          })}
        >
          <m.div
            className={css({
              position: 'relative',
              bg: content.status === 'success' ? 'green.100' : 'red.100',
              w: '100vw',
              rounded: 'lg',
              shadow: '2xl',
              md: {
                w: '320px',
              },
            })}
            initial={{
              y: -200,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -200,
              opacity: 0,
            }}
          >
            <div className={hstack({ gap: '24px', p: '20px' })}>
              {content.status === 'success' ? (
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  style={{
                    width: '42px',
                    height: '42px',
                    color: 'green',
                    background: 'white',
                    borderRadius: '100%',
                  }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  style={{
                    width: '42px',
                    height: '42px',
                    color: 'red',
                    background: 'white',
                    borderRadius: '100%',
                  }}
                />
              )}
              <p className={css({ fontSize: 'lg', fontWeight: 'bold' })}>{content.message}</p>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  )
}
