import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { hstack } from '../../../styled-system/patterns'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FC } from 'react'
import { css } from '../../../styled-system/css'

type HistoryCardMenuItemProps = {
  icon: IconDefinition
  color: string
  title: string
  onClickFunc: () => void
}
export const HistoryCardMenuItem: FC<HistoryCardMenuItemProps> = (props) => {
  const { icon, color, title, onClickFunc } = props
  return (
    <li
      className={css({
        w: 'full',
        px: '20px',
        py: '10px',
        fontSize: 'md',
        cursor: 'pointer',
        _hover: {
          bg: 'gray',
          rounded: 'lg',
        },
        md: {
          fontSize: 'lg',
        },
      })}
      onClick={onClickFunc}
    >
      <div
        className={hstack({
          justify: 'stretch',
          gap: '20px',
        })}
      >
        <FontAwesomeIcon icon={icon} style={{ width: '22px', height: '22px', color: color }} />
        {title}
      </div>
    </li>
  )
}
