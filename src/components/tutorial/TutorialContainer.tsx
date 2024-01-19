import { useState } from 'react'
import { vstack } from '../../../styled-system/patterns'
import { Period as TPeriod } from '@/api/models/card.model'
import { TutorialToHistoryButton, TutorialCard, TutorialProgressBar } from '@/components/tutorial'

type Card = {
  period: TPeriod
  title: string
  content: string
}

export const TutorialContainer = () => {
  const progressStepSize = 100 / 6
  const [currentValue, setCurrentValue] = useState<number>(progressStepSize)
  const [cardPosition, setCardPosition] = useState<number>(0)
  const [cardList, setCardList] = useState<Card[]>([
    {
      period: '4',
      title: '',
      content: '',
    },
    {
      period: '3',
      title: '',
      content: '',
    },
    {
      period: '2',
      title: '',
      content: '',
    },
    {
      period: '1',
      title: '',
      content: '',
    },
    {
      period: '0',
      title: '',
      content: '',
    },
  ])

  const questions = [
    '印象的だったことは？',
    'どんなことをしてあそんでいた？',
    '夢中になったものは？',
    'どんなことに悩んでいた？',
    '熱中したことは？',
  ]

  const [isValidatedTitle, setIsValidatedTitle] = useState(false)
  const [isValidatedContent, setIsValidatedContent] = useState(false)

  const handleValidate = () => {
    const hasTitle = !!cardList[cardPosition].title
    const isContentTooLong = cardList[cardPosition].content.length > 1000

    setIsValidatedTitle(!hasTitle)
    setIsValidatedContent(isContentTooLong)

    return !hasTitle || isContentTooLong
  }

  const handleNext = () => {
    if (handleValidate()) return
    setCardPosition((prevValue) => Math.min(prevValue + 1, 4))
    setCurrentValue((prevValue) => Math.min(prevValue + progressStepSize, 100))
    setIsValidatedTitle(false)
    setIsValidatedContent(false)
  }

  const handlePrev = () => {
    setCardPosition((prevValue) => Math.max(prevValue - 1, 0))
    setCurrentValue((prevValue) => Math.max(prevValue - progressStepSize, progressStepSize))
    setIsValidatedTitle(false)
    setIsValidatedContent(false)
  }

  return (
    <>
      <TutorialProgressBar currentValue={currentValue} />
      <div className={vstack({ mt: '30px' })}>
        <TutorialCard
          cardPosition={cardPosition}
          cardList={cardList}
          placeholderText={questions[cardPosition]}
          isValidatedTitle={isValidatedTitle}
          isValidatedContent={isValidatedContent}
          handleNext={handleNext}
          handlePrev={handlePrev}
          setCardList={setCardList}
        />
        <TutorialToHistoryButton
          cardList={cardList}
          cardPosition={cardPosition}
          progressStepSize={progressStepSize}
          setCurrentValue={setCurrentValue}
          handleValidate={handleValidate}
        />
      </div>
    </>
  )
}
