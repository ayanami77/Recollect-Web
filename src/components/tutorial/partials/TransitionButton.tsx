import { m } from 'framer-motion'
import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { center } from '../../../../styled-system/patterns'

type TransitionButtonProps = {
  content: {
    movement: 'prev' | 'next'
    onClick: () => void
    cardPosition: number
  }
}

export const TransitionButton: FC<TransitionButtonProps> = ({ content }) => {
  return (
    <m.button
      onClick={content.onClick}
      className={center({
        w: '70px',
        h: '70px',
        bg: 'dimBlue',
        rounded: 'full',
        color: 'white',
        cursor: 'pointer',
        visibility:
          (content.cardPosition === 0 && content.movement === 'prev') ||
          (content.cardPosition === 4 && content.movement === 'next')
            ? 'hidden'
            : 'visible',
      })}
      whileTap={{ scale: 0.9 }}
    >
      {content.movement === 'prev' ? (
        <FontAwesomeIcon icon={faChevronLeft} style={{ width: '30px', height: '30px' }} />
      ) : (
        <FontAwesomeIcon icon={faChevronRight} style={{ width: '30px', height: '30px' }} />
      )}
    </m.button>
  )
}
