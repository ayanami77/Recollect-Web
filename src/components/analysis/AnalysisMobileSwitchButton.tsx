import { m } from 'framer-motion'
import { center } from '../../../styled-system/patterns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FC } from 'react'

type AnalysisMobileSwitchButtonProps = {
  icon: IconDefinition
  isDisabled: boolean
  onClick: () => void
}
export const AnalysisMobileSwitchButton: FC<AnalysisMobileSwitchButtonProps> = (props) => {
  const { icon, isDisabled, onClick } = props
  return (
    <m.button
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
    </m.button>
  )
}
