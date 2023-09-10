import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { css } from '../../../../styled-system/css'
import { hstack } from '../../../../styled-system/patterns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'

export const FlowTutorial = () => {
  const router = useRouter()

  const handleClick = () => {
    router.push('/tutorial')
  }
  return (
    <>
      <button
        className={css({ position: 'fixed', bottom: '20px', left: '24px', cursor: 'pointer' })}
        onClick={handleClick}
      >
        <div
          className={css({
            minW: '200px',
            rounded: '16px',
            shadow: '2xl',
          })}
        >
          <div className={hstack({ gap: '24px', p: '20px' })}>
            <p className={css({ fontSize: 'md' })}>チュートリアルに進む</p>
            <FontAwesomeIcon icon={faArrowRight} style={{ width: '26px', color: '#0C4C97' }} />
          </div>
        </div>
      </button>
    </>
  )
}
