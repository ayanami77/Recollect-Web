import { m } from 'framer-motion'
import { FC } from 'react'
import { center } from '../../../styled-system/patterns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

type TutorialMobileSwitchButtonProps = {
  movement: 'prev' | 'next'
  onClick: () => void
  cardPosition: number
}
export const TutorialMobileSwitchButton: FC<TutorialMobileSwitchButtonProps> = (props) => {
  const { onClick, movement, cardPosition } = props
  return (
    <m.button
      onClick={onClick}
      className={center({
        p: '8px',
        cursor: 'pointer',
        bg: 'dimBlue',
        color: 'white',
        rounded: 'xl',
        md: {
          p: '12px',
        },
        _hover: {
          opacity: 0.9,
        },
        visibility:
          (cardPosition === 0 && movement === 'prev') || (cardPosition === 4 && movement === 'next')
            ? 'hidden'
            : 'visible',
      })}
      whileTap={{ scale: 0.9 }}
    >
      {movement === 'prev' ? (
        <FontAwesomeIcon icon={faChevronLeft} style={{ width: '24px', height: '24px' }} />
      ) : (
        <FontAwesomeIcon icon={faChevronRight} style={{ width: '24px', height: '24px' }} />
      )}

      {/* <m.button
      onClick={onClick}
      className={center({
        p: '8px',
        cursor: 'pointer',
        bg: 'dimBlue',
        color: 'white',
        rounded: 'xl',
        _hover: {
          opacity: 0.9,
        },
        _disabled: {
          opacity: '0.8',
          cursor: 'default',
        },
        md: {
          p: '12px',
        },
      })}
      disabled={isDisabled}
      whileTap={{ scale: 0.9 }}
    >
      <FontAwesomeIcon icon={icon} style={{ width: '24px', height: '24px' }} />
    </m.button> */}
    </m.button>
  )
}
