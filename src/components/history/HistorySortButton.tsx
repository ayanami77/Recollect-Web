import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { m } from 'framer-motion'
import { FC } from 'react'
import { css } from '../../../styled-system/css'

type HistorySortButtonProps = {
  isAsc: boolean
  onClickFunc: () => void
}

export const HistorySortButton: FC<HistorySortButtonProps> = (props) => {
  const { isAsc, onClickFunc } = props
  return (
    <m.button
      className={css({
        position: 'relative',
        w: '100px',
        p: '8px',
        fontSize: 'md',
        fontWeight: 'bold',
        rounded: 'md',
        cursor: 'pointer',
        md: {
          fontSize: 'md',
        },
      })}
      onClick={onClickFunc}
    >
      {isAsc ? '現在' : '幼少期'}
      <FontAwesomeIcon
        icon={faArrowDown}
        className={css(
          {
            position: 'absolute',
            top: '0',
            right: '0',
            width: '20px',
            height: '20px',
            color: 'dimBlue',
          },
          isAsc
            ? {
                transform: 'translate(0, 50%)',
              }
            : {
                transform: 'rotate(180deg) translate(0, -50%)',
              },
        )}
      />
    </m.button>
  )
}
