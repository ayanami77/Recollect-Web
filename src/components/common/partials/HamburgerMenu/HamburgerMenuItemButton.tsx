import { m } from 'framer-motion'
import { FC } from 'react'
import { css } from '../../../../../styled-system/css'
import { hstack } from '../../../../../styled-system/patterns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

type HamburgerMenuItemButtonProps = {
  title: string
  active: boolean
  yPos: number
  icon: IconDefinition
  onClickFunc: () => void
}
export const HamburgerMenuItemButton: FC<HamburgerMenuItemButtonProps> = (props) => {
  const { title, active, icon, yPos, onClickFunc } = props

  return (
    <li
      className={css({
        listStyle: 'none',
      })}
    >
      <m.button
        className={hstack({
          pos: 'absolute',
          top: 1,
          right: 0,
          w: '280px',
          bg: 'lightGray',
          p: '20px',
          shadow: '2xl',
          rounded: 'xl',
          gap: '20px',
          visibility: active ? 'visible' : 'hidden',
          md: {
            p: '20px',
          },
        })}
        whileTap={{ scale: 0.9 }}
        animate={
          active
            ? {
                x: 0,
                y: yPos,
              }
            : {
                x: 0,
                y: 0,
              }
        }
        onClick={onClickFunc}
      >
        <FontAwesomeIcon icon={icon} style={{ width: '32px', height: '32px', color: '#0C4C97' }} />
        <span className={css({ fontWeight: 'bold', fontSize: 'xl', color: 'black' })}>{title}</span>
      </m.button>
    </li>
  )
}
