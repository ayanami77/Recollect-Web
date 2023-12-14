import { FC, useState } from 'react'
import { hstack } from '../../../../styled-system/patterns'
import { OneByOneAnalysisBoard } from './OneByOneAnalysisBoard'
import { Card as TCard } from '@/api/models/card.model'
import { Session } from 'next-auth'
import { FadeInWrapper } from '../../common'
import { sortCardsByPeriod } from '@/utils/sortCardsByPeriod'

type AnalysisContainerProps = {
  data: TCard[]
  cardId?: string | string[]
  user: Session['user']
}
export const OneByOneAnalysisContainer: FC<AnalysisContainerProps> = (props) => {
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
    <FadeInWrapper>
      <div
        className={hstack({
          w: 'full',
          mt: '24px',
          md: {
            mt: '40px',
          },
        })}
      >
        <OneByOneAnalysisBoard content={allCards[index]} next={next} prev={prev} user={user} />
      </div>
    </FadeInWrapper>
  )
}
