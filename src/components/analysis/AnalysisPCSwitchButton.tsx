import { m } from 'framer-motion'
import { FC } from 'react'
import { center } from '../../../styled-system/patterns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

type AnalysisPCSwitchButtonProps = {
  icon: IconDefinition
  isDisabled: boolean
  onClick: () => void
}
export const AnalysisPCSwitchButton: FC<AnalysisPCSwitchButtonProps> = (props) => {
  const { onClick, isDisabled, icon } = props
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
        _disabled: {
          opacity: '0.8',
          cursor: 'default',
        },
      })}
      disabled={isDisabled}
      whileTap={{ scale: 0.9 }}
    >
      <FontAwesomeIcon icon={icon} style={{ width: '30px', height: '30px' }} />
    </m.button>
  )
}
