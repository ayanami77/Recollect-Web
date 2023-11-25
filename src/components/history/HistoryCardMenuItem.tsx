import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { hstack } from '../../../styled-system/patterns'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FC } from 'react'

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
      className={hstack({
        w: 'full',
        p: '10px',
        fontSize: 'md',
        cursor: 'pointer',
        justify: 'center',
        gap: '20px',
        _hover: {
          bg: 'gray',
          rounded: 'xl',
        },
        md: {
          fontSize: 'lg',
        },
      })}
      onClick={onClickFunc}
    >
      <FontAwesomeIcon icon={icon} style={{ width: '22px', height: '22px', color: color }} />
      {title}
    </li>
  )
}
