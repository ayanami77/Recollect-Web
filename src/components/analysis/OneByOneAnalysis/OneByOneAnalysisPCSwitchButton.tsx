import { m } from 'framer-motion'
import { FC } from 'react'
import { center } from '../../../../styled-system/patterns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

type OneByOneAnalysisPCSwitchButtonProps = {
  icon: IconDefinition
  isDisabled: boolean
  onClick: () => void
}
export const OneByOneAnalysisPCSwitchButton: FC<OneByOneAnalysisPCSwitchButtonProps> = (props) => {
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
        transition: 'background .15s',
        _hover: isDisabled
          ? {}
          : {
              bg: 'hovered_dimBlue',
            },
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
