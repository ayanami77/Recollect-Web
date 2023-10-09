import { FC, ReactNode } from 'react'
import { css } from '../../../../styled-system/css'
import { hstack, vstack } from '../../../../styled-system/patterns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { controlScreenScroll } from '@/utils/controlScreenScroll'
import { CardCreateModal } from '.'
import { Period as TPeriod } from '@/api/models/card.model'

type CardBoxProps = {
  children: ReactNode
  period: TPeriod
}

export const CardsSection: FC<CardBoxProps> = (props) => {
  const { children, period } = props
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => {
    controlScreenScroll(isOpen)
    setIsOpen((prev) => !prev)
  }

  return (
    <>
      <div className={css({ w: 'full', p: '24px', bg: 'blue.200', rounded: '2xl' })}>
        <div className={hstack({ justify: 'space-between' })}>
          <div className={hstack({})}>
            <div className={css({ w: '12px', h: '12px', bg: 'orange.300', rounded: 'full' })}></div>
            <h2 className={css({ fontSize: '2xl', w: 'fit', fontWeight: 'bold' })}>{period}</h2>
          </div>
          <button className={css({ cursor: 'pointer' })} title='自分史を追加' onClick={handleOpen}>
            <FontAwesomeIcon
              icon={faPlus}
              style={{ width: '28px', height: '28px', color: '#0C4C97' }}
            />
          </button>
        </div>
        <div className={css({ w: 'full', h: '4px', bg: 'blue.400', mt: '8px', rounded: '2xl' })} />
        <div className={vstack({ justify: 'start', gap: '24px', mt: '12px' })}>{children}</div>
      </div>
      {isOpen && <CardCreateModal content={{ handleOpen, data: { period } }} />}
    </>
  )
}
