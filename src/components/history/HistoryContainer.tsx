import { Card as TCard, Period as TPeriod } from '@/api/models/card.model'
import { vstack } from '../../../styled-system/patterns'
import { HistoryCard } from './HistoryCard'
import { HistorySection } from './HistorySection'
import { FC } from 'react'
import { Toast } from '../common'
import { useToastStore } from '@/store/useToastStore'
import { Session } from 'next-auth'

export const sortCardsByPeriod = (data: TCard[]) => {
  const result: { [key: string]: TCard[] } = {
    '0': [],
    '1': [],
    '2': [],
    '3': [],
    '4': [],
  }
  for (const d of data) result[d.period].push(d)
  return result
}

type HistoryContainerProps = {
  data: TCard[]
  user: Session['user']
}
export const HistoryContainer: FC<HistoryContainerProps> = (props) => {
  const { data, user } = props
  const allCards = sortCardsByPeriod(data)
  const toastStore = useToastStore()

  return (
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
  )
}
