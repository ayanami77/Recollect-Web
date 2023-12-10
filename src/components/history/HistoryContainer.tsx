import { Card as TCard, Period as TPeriod } from '@/api/models/card.model'
import { vstack } from '../../../styled-system/patterns'
import { HistoryCard } from './HistoryCard'
import { HistorySection } from './HistorySection'
import { FC } from 'react'
import { FadeInWrapper, Toast } from '../common'
import { useToastStore } from '@/store/useToastStore'
import { Session } from 'next-auth'

type HistoryContainerProps = {
  allCards: { [key: string]: TCard[] }
  user: Session['user']
  isAscPeriod: boolean
}

export const HistoryContainer: FC<HistoryContainerProps> = (props) => {
  const { allCards, user, isAscPeriod } = props
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
        {Object.keys(allCards).map((period) => {
          return (
            <HistorySection key={period} period={period as TPeriod} user={user}>
              {allCards[period].length ? (
                allCards[period].map((card) => {
                  return <HistoryCard data={card} key={card.id} user={user} />
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
