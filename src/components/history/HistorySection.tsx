import { FC, ReactNode } from 'react'
import { m } from 'framer-motion'
import { css } from '../../../styled-system/css'
import { hstack, vstack } from '../../../styled-system/patterns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { controlScreenScroll } from '@/utils/controlScreenScroll'
import { HistoryCardCreateModal } from './HistoryCardCreateModal'
import { Period as TPeriod } from '@/api/models/card.model'
import { toPeriodStringFromNumber } from '@/utils/toPeriodStringFromNumber'

type HistorySectionProps = {
  children: ReactNode
  period: TPeriod
}

export const HistorySection: FC<HistorySectionProps> = (props) => {
  const { children, period } = props
  const [isOpen, setIsOpen] = useState(false)
  const handleCreateModal = () => {
    controlScreenScroll(isOpen)
    setIsOpen((prev) => !prev)
  }

  return (
    <>
      <div
        className={css({
          w: 'full',
          p: '14px',
          bg: 'blue.200',
          rounded: '3xl',
          shadow: 'lg',
          md: { p: '24px' },
        })}
      >
        <div className={hstack({ justify: 'space-between' })}>
          <h2
            className={css({
              fontSize: 'xl',
              w: 'fit',
              fontWeight: 'bold',
              pl: '12px',
              md: { fontSize: '2xl' },
            })}
          >
            {toPeriodStringFromNumber(period)}
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
            fontSize: 'sm',
            fontWeight: 'bold',
            color: 'white',
            bg: 'dimBlue',
            rounded: 'full',
            cursor: 'pointer',
            md: {
              fontSize: 'md',
            },
          })}
          onClick={handleCreateModal}
          whileHover={{ scale: 1.02 }}
        >
          <FontAwesomeIcon
            icon={faPlus}
            style={{ width: '20px', height: '20px', color: 'white' }}
          />
          自分史を作成する
        </m.button>
      </div>
      {isOpen && <HistoryCardCreateModal data={{ period }} handleModal={handleCreateModal} />}
    </>
  )
}
