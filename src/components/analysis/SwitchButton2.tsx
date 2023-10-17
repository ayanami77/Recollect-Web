import { m } from 'framer-motion'
import { center } from '../../../styled-system/patterns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FC } from 'react'

type SwitchButton2Props = {
  icon: IconDefinition
  onClick: () => void
}
export const SwitchButton2: FC<SwitchButton2Props> = (props) => {
  const { icon, onClick } = props
  return (
    <m.button
      onClick={onClick}
      className={center({
        p: '12px',
        cursor: 'pointer',
        bg: 'dimBlue',
        color: 'white',
        rounded: 'xl',
        _hover: {
          opacity: 0.9,
        },
      })}
      whileTap={{ scale: 0.9 }}
    >
      <FontAwesomeIcon icon={icon} style={{ width: '24px', height: '24px' }} />
    </m.button>
  )
}
