import { FC, ReactNode } from 'react'
import { css } from '../../../../styled-system/css'
import { hstack, vstack } from '../../../../styled-system/patterns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

type CardBoxProps = {
  children: ReactNode
  period: string
}

// const period_to_color = {
//   "大学生": "green.200",
//   "高校生": "yellow.200",
//   "中学生": "blue.200",
//   "小学生": "orange.200",
//   "幼少期": "beige.200",
// }

export const CardBox: FC<CardBoxProps> = (props) => {
  const { children, period } = props

  return (
    <div className={css({ w: 'full', p: '24px', bg: 'blue.200', rounded: '2xl' })}>
      <div className={hstack({ justify: 'space-between' })}>
        <div className={hstack({})}>
          <div className={css({ w: '12px', h: '12px', bg: 'orange.300', rounded: 'full' })}></div>
          <h2 className={css({ fontSize: '2xl', w: 'fit', fontWeight: 'bold' })}>{period}</h2>
        </div>
        <button className={css({ cursor: 'pointer' })}>
          <FontAwesomeIcon
            icon={faPlus}
            style={{ width: '28px', height: '28px', color: '#0C4C97' }}
          />
        </button>
      </div>
      <div className={css({ w: 'full', h: '4px', bg: 'blue.400', mt: '8px', rounded: '2xl' })} />
      <div className={vstack({ justify: 'start', gap: '24px', mt: '12px' })}>{children}</div>
    </div>
  )
}
