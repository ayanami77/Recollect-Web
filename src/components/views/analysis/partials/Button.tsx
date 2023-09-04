import { m } from 'framer-motion'
import { FC } from 'react'
import { center } from '../../../../../styled-system/patterns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

type ButtonProps = {
  content: {
    movement: string
    onClick: () => void
  }
}
export const Button: FC<ButtonProps> = (props) => {
  const { content } = props
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
