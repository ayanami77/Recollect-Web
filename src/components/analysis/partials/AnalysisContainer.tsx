import { Card as TCard } from '@/api/models/card.model'
import { FC, useState } from 'react'
import { hstack } from '../../../../styled-system/patterns'
import { AnalysisDataNotRegistered, Board, Button } from '.'
import { sortCardsByPeriod } from '@/components/history'

type AnalysisContainerProps = {
  content: {
    data?: TCard[]
    cardId?: string
  }
}

export const AnalysisContainer: FC<AnalysisContainerProps> = (props) => {
  const { content } = props
  const [index, setIndex] = useState(0)

  const makeAllCards = (data: TCard[]) => {
    const sortedCards = sortCardsByPeriod(data).flat()
    if (content.cardId) {
      const pos = sortedCards.findIndex((v) => v.id === content.cardId)
      const newArr = [...sortedCards.splice(pos), ...sortedCards]
      return newArr
    }
    return sortedCards
  }

  const allCards = content.data ? makeAllCards(content.data) : []

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
        gap: '60px',
        w: 'fit',
        mx: 'auto',
        mt: '80px',
      })}
    >
      {allCards.length ? (
        <>
          <Button content={{ movement: 'prev', onClick: prev }} />
          <Board content={allCards[index]} />
          <Button content={{ movement: 'next', onClick: next }} />
        </>
      ) : (
        <AnalysisDataNotRegistered />
      )}
    </div>
  )
}
