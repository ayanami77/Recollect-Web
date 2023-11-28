import Link from 'next/link'
import { FC, useState } from 'react'
import { css } from '../../../styled-system/css'
import { hstack } from '../../../styled-system/patterns'
import { AnalysisBoard } from './AnalysisBoard'
import { sortCardsByPeriod } from '@/components/history'
import { Card as TCard } from '@/api/models/card.model'
import { Session } from 'next-auth'

type AnalysisContainerProps = {
  data: TCard[]
  cardId?: string | string[]
  user: Session['user']
}
export const AnalysisContainer: FC<AnalysisContainerProps> = (props) => {
  const { data, cardId, user } = props
  const [index, setIndex] = useState(0)

  const makeAllCards = (data: TCard[]) => {
    const sortedCards = sortCardsByPeriod(data)
    const allCards = Object.values(sortedCards).flat()
    if (cardId) {
      const pos = allCards.findIndex((card) => card.id === cardId)
      const allCardsStartWithPos = [...allCards.splice(pos), ...allCards]
      return allCardsStartWithPos
    }
    return allCards
  }

  const allCards = makeAllCards(data)

  const prev = () => {
    const prevPos = index - 1
    if (allCards && prevPos < 0) {
      setIndex(allCards.length - 1)
    } else {
      setIndex(prevPos)
    }
  }

  const next = () => {
    const nextPos = index + 1
    if (allCards && allCards.length - 1 < nextPos) {
      setIndex(0)
    } else {
      setIndex(nextPos)
    }
  }

  return (
    <div
      className={hstack({
        w: 'full',
        mt: '24px',
      })}
    >
      {allCards.length ? (
        <AnalysisBoard content={allCards[index]} next={next} prev={prev} user={user} />
      ) : (
        <div className={css({ px: '20px', py: '16px' })}>
          自分史が作成されていません。
          <Link href={'/history'}>
            <span className={css({ color: 'blue.400' })}>自分史をみる</span>
          </Link>
          からデータを登録することができます。
        </div>
      )}
    </div>
  )
}
