import { FC, ReactNode } from 'react'
import { m } from 'framer-motion'
import { css } from '../../../styled-system/css'
import { hstack, vstack } from '../../../styled-system/patterns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { controlScreenScroll } from '@/utils/controlScreenScroll'
import { CardCreateModal } from './CardCreateModal'
import { Period as TPeriod } from '@/api/models/card.model'

type HistorySegmentProps = {
  children: ReactNode
  period: TPeriod
}

export const HistorySegment: FC<HistorySegmentProps> = (props) => {
  const { children, period } = props
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => {
    controlScreenScroll(isOpen)
    setIsOpen((prev) => !prev)
  }

  return (
    <>
      <div className={css({ w: 'full', p: '24px', bg: 'blue.200', rounded: '3xl', md: {} })}>
        <div className={hstack({ justify: 'space-between' })}>
          <h2 className={css({ fontSize: '2xl', w: 'fit', fontWeight: 'bold', pl: '12px' })}>
            {period}
          </h2>
        </div>
        <div className={vstack({ justify: 'start', gap: '24px', mt: '12px' })}>{children}</div>
        <m.button
          className={hstack({
            justify: 'center',
            w: '96%',
            p: '8px',
            mx: 'auto',
            mt: '16px',
            fontSize: '18px',
            fontWeight: 'bold',
            color: 'white',
            bg: 'dimBlue',
            rounded: 'full',
            cursor: 'pointer',
          })}
          onClick={handleOpen}
          whileHover={{ scale: 1.02 }}
        >
          <FontAwesomeIcon
            icon={faPlus}
            style={{ width: '20px', height: '20px', color: 'white' }}
          />
          自分史を追加する
        </m.button>
      </div>
      {isOpen && <CardCreateModal content={{ handleOpen, data: { period } }} />}
    </>
  )
}
