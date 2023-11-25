import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { hstack } from '../../../../../styled-system/patterns'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FC } from 'react'
import { css } from '../../../../../styled-system/css'

type NavigationMenuItemButtonProps = {
  title: string
  icon: IconDefinition
  onClickFunc: () => void
}
export const NavigationMenuItemButton: FC<NavigationMenuItemButtonProps> = (props) => {
  const { title, icon, onClickFunc } = props

  return (
    <li>
      <button className={css({ cursor: 'pointer' })} onClick={onClickFunc}>
        <span
          className={hstack({
            fontWeight: 'bold',
            p: '12px',
            rounded: '2xl',
            bg: 'transparent',
            shadow: 'none',
          })}
        >
          <FontAwesomeIcon
            icon={icon}
            style={{ width: '24px', height: '24px', color: '#0C4C97' }}
          />
          {title}
        </span>
      </button>
    </li>
  )
}
