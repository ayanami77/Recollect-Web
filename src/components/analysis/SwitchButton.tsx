import { m } from 'framer-motion'
import { FC } from 'react'
import { center } from '../../../styled-system/patterns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

type SwitchButtonProps = {
  icon: IconDefinition
  onClick: () => void
}
export const SwitchButton: FC<SwitchButtonProps> = (props) => {
  const { onClick, icon } = props
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
      })}
      whileTap={{ scale: 0.9 }}
    >
      <FontAwesomeIcon icon={icon} style={{ width: '30px', height: '30px' }} />
    </m.button>
  )
}
