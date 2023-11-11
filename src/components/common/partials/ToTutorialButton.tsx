import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { css } from '../../../../styled-system/css'
import { hstack } from '../../../../styled-system/patterns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'

export const ToTutorialButton = () => {
  const router = useRouter()

  const handleClick = () => {
    router.push('/tutorial')
  }
  return (
    <>
      <button
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
      >
        <div
          className={css({
            minW: '200px',
          })}
        >
          <div className={hstack({ gap: '24px', p: '20px' })}>
            <p className={css({ fontSize: 'md', fontWeight: 'bold' })}>チュートリアルに進む</p>
            <FontAwesomeIcon icon={faArrowRight} style={{ width: '26px', color: '#0C4C97' }} />
          </div>
        </div>
      </button>
    </>
  )
}
