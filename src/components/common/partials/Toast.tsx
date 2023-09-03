import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faXmark, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { hstack } from '../../../../styled-system/patterns'
import { css } from '../../../../styled-system/css'
import { motion, AnimatePresence } from 'framer-motion'
import { FC, useEffect, useState } from 'react'

//TODO: 自動で消滅するようにする。
type ToastProps = {
  content: {
    status: string
    message: string
  }
}
export const Toast: FC<ToastProps> = (props) => {
  const { content } = props
  const [isShow, setIsShow] = useState(false)
  useEffect(() => {
    const clearUpTimeout = setTimeout(() => {
      setIsShow(true)
    }, 3000)
    return () => clearTimeout(clearUpTimeout)
  }, [])

  return (
    <AnimatePresence>
      {isShow && (
        <div className={css({ position: 'fixed', top: '24px', right: '24px' })}>
          <motion.div
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
            <button
              className={css({
                position: 'absolute',
                top: '14px',
                right: '14px',
                cursor: 'pointer',
              })}
              onClick={() => setIsShow(false)}
            >
              <FontAwesomeIcon icon={faXmark} style={{ width: '20px', height: '20px' }} />
            </button>
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
