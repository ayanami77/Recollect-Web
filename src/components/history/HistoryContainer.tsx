import { Card as TCard, Period as TPeriod } from '@/api/models/card.model'
import { vstack } from '../../../styled-system/patterns'
import { HistoryCard } from './HistoryCard'
import { HistorySection } from './HistorySection'
import { FC } from 'react'
import { FadeInWrapper, Toast } from '../common'
import { useToastStore } from '@/store/useToastStore'

type HistoryContainerProps = {
  allCards: { [key: string]: TCard[] }
  isAscPeriod: boolean
}

export const HistoryContainer: FC<HistoryContainerProps> = (props) => {
  const { allCards, isAscPeriod } = props
  const toastStore = useToastStore()
  const periodKeys = Object.keys(allCards)

  if (!isAscPeriod) {
    periodKeys.reverse()
  }

  return (
    <FadeInWrapper>
      <div
        className={vstack({
          w: 'full',
          gap: '32px',
          mt: '40px',
        })}
      >
        {periodKeys.map((period) => {
          return (
            <HistorySection key={period} period={period as TPeriod}>
              {allCards[period].length ? (
                allCards[period].map((card) => {
                  return <HistoryCard data={card} key={card.id} />
                })
              ) : (
                <span
                  className={vstack({
                    w: 'full',
                    p: '8px',
                    bg: 'white',
                    fontWeight: 'bold',
                    rounded: '2xl',
                  })}
                >
                  自分史が登録されていません
                </span>
              )}
            </HistorySection>
          )
        })}
        <Toast
          content={{
            status: toastStore.type,
            message: toastStore.message,
            isShow: toastStore.isShow,
          }}
        />
      </div>
    </FadeInWrapper>
  )
}
