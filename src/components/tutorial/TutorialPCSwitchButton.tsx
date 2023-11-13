import { m } from 'framer-motion'
import { FC } from 'react'
import { center } from '../../../styled-system/patterns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

type TutorialPCSwitchButtonProps = {
  movement: 'prev' | 'next'
  onClick: () => void
  cardPosition: number
}
export const TutorialPCSwitchButton: FC<TutorialPCSwitchButtonProps> = (props) => {
  const { onClick, movement, cardPosition } = props
  return (
    <m.button
      onClick={onClick}
      className={center({
        w: '70px',
        h: '70px',
        bg: 'dimBlue',
        rounded: '3xl',
        color: 'white',
        cursor: 'pointer',
        visibility:
          (cardPosition === 0 && movement === 'prev') || (cardPosition === 4 && movement === 'next')
            ? 'hidden'
            : 'visible',
      })}
      whileTap={{ scale: 0.9 }}
    >
      {movement === 'prev' ? (
        <FontAwesomeIcon icon={faChevronLeft} style={{ width: '30px', height: '30px' }} />
      ) : (
        <FontAwesomeIcon icon={faChevronRight} style={{ width: '30px', height: '30px' }} />
      )}
    </m.button>
  )
}
