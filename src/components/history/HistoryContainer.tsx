import { Card as TCard, Period as TPeriod } from '@/api/models/card.model'
import { vstack } from '../../../styled-system/patterns'
import { Card } from './Card'
import { HistorySegment } from './HistorySegment'
import { FC } from 'react'

const period_with_number = {
  現在まで: 0,
  高校生: 1,
  中学生: 2,
  小学生: 3,
  幼少期: 4,
}

export const sortCardsByPeriod = (data: TCard[]) => {
  const result = []
  for (let i = 0; i < Object.keys(period_with_number).length; i++) {
    const arr = []
    for (const d of data) {
      if (period_with_number[d.period] === i) {
        arr.push(d)
      }
    }
    result.push(arr)
  }

  return result
}

type HistoryContainerProps = {
  data: TCard[]
}
export const HistoryContainer: FC<HistoryContainerProps> = (props) => {
  const { data } = props
  const allCards = sortCardsByPeriod(data)
  return (
    <div
      className={vstack({
        w: 'full',
        gap: '32px',
        my: '24px',
      })}
    >
      {allCards.map((cards, index) => {
        const period = Object.keys(period_with_number)[index] as TPeriod
        return (
          <HistorySegment key={index} period={period}>
            {cards.length ? (
              cards.map((card) => {
                return <Card data={card} key={card.id} />
              })
            ) : (
              <p
                className={vstack({
                  w: 'full',
                  p: '8px',
                  bg: 'white',
                  fontWeight: 'bold',
                  rounded: '2xl',
                })}
              >
                自分史が登録されていません。
              </p>
            )}
          </HistorySegment>
        )
      })}
    </div>
  )
}
