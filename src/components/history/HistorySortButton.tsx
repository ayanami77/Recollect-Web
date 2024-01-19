import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import { css } from '../../../styled-system/css'

type HistorySortButtonProps = {
  isAscPeriod: boolean
  onClickFunc: () => void
}

export const HistorySortButton: FC<HistorySortButtonProps> = (props) => {
  const { isAscPeriod, onClickFunc } = props
  return (
    <button
      className={css({
        position: 'relative',
        w: '100px',
        p: '8px',
        fontSize: 'md',
        fontWeight: 'bold',
        color: 'black',
        rounded: 'md',
        cursor: 'pointer',
        transition: 'background .15s',
        _hover: {
          bg: 'gray',
        },
        md: {
          fontSize: 'md',
        },
      })}
      onClick={onClickFunc}
    >
      <span
        className={css({
          mr: '10px',
        })}
      >
        {isAscPeriod ? '現在' : '幼少期'}
      </span>
      <FontAwesomeIcon
        icon={faArrowDown}
        className={css(
          {
            position: 'absolute',
            top: '0',
            right: '8px',
            width: '20px',
            height: '20px',
            color: 'dimBlue',
          },
          isAscPeriod
            ? {
                transform: 'translate(0, 50%)',
              }
            : {
                transform: 'rotate(180deg) translate(0, -50%)',
              },
        )}
      />
    </button>
  )
}
