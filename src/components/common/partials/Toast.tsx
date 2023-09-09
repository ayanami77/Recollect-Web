import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { hstack } from '../../../../styled-system/patterns'
import { css } from '../../../../styled-system/css'
import { m, AnimatePresence } from 'framer-motion'
import { FC } from 'react'

//TODO: 自動で消滅するようにする。
type ToastProps = {
  content: {
    status: string
    message: string
  }
}
export const Toast: FC<ToastProps> = (props) => {
  const { content } = props
  return (
    <AnimatePresence>
      <div className={css({ position: 'fixed', top: '24px', right: '24px' })}>
        <m.div
          className={css({
            position: 'relative',
            bg: content.status === 'success' ? 'green.100' : 'red.100',
            minW: '320px',
            rounded: '16px',
            shadow: '2xl',
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
            <p className={css({ fontSize: 'md' })}>{content.message}</p>
          </div>
        </m.div>
      </div>
    </AnimatePresence>
  )
}
