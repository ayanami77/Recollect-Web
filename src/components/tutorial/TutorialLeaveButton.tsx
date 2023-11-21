import { m } from 'framer-motion'
import { FC } from 'react'
import { css } from '../../../styled-system/css'
import { useRouter } from 'next/router'
import { hstack } from '../../../styled-system/patterns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

export const TutorialLeaveButton: FC = () => {
  const router = useRouter()
  const handleClick = () => {
    if (window.confirm('チュートリアルを終了しますか？')) {
      router.push('/history')
    }
  }
  return (
    <m.button
      className={css({
        position: 'fixed',
        bottom: '20px',
        bg: 'white',
        left: '24px',
        cursor: 'pointer',
        rounded: 'xl',
        shadow: 'xl',
      })}
      onClick={handleClick}
      whileTap={{ scale: 0.9 }}
    >
      <div
        className={css({
          minW: '200px',
        })}
      >
        <div className={hstack({ gap: '24px', p: '20px' })}>
          <p className={css({ fontSize: 'md', fontWeight: 'bold' })}> チュートリアルを退出する</p>
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            style={{ width: '26px', color: '#0C4C97' }}
          />
        </div>
      </div>
    </m.button>
  )
}
