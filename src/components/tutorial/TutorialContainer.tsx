import { FC, useState } from 'react'
import { vstack } from '../../../styled-system/patterns'
import { Period as TPeriod } from '@/api/models/card.model'
import {
  TutorialLeaveButton,
  TutorialToHistoryButton,
  TutorialCard,
  TutorialProgressBar,
} from '@/components/tutorial'
import { Session } from 'next-auth'

type Card = {
  period: TPeriod
  title: string
  content: string
}

type TutorialContainerProps = {
  user: Session['user']
}

export const TutorialContainer: FC<TutorialContainerProps> = ({ user }) => {
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
    '周りにはどんな人がいた？',
    'どんなことをしてあそんでいた？',
    '夢中になったものは？',
    'どんなことに悩んでいた？',
    '熱中したことは？',
  ]

  const [isValidated, setIsValidated] = useState(false)

  const handleValidate = () => {
    if (cardList[cardPosition].title) return false
    setIsValidated(true)
    return true
  }

  const handleNext = () => {
    if (handleValidate()) return
    setCardPosition((prevValue) => Math.min(prevValue + 1, 4))
    setCurrentValue((prevValue) => Math.min(prevValue + progressStepSize, 100))
    setIsValidated(false)
  }

  const handlePrev = () => {
    setCardPosition((prevValue) => Math.max(prevValue - 1, 0))
    setCurrentValue((prevValue) => Math.max(prevValue - progressStepSize, progressStepSize))
    setIsValidated(false)
  }

  return (
    <>
      <TutorialProgressBar currentValue={currentValue} />
      <div className={vstack({ mt: '30px' })}>
        <TutorialCard
          cardPosition={cardPosition}
          cardList={cardList}
          placeholderText={questions[cardPosition]}
          isValidated={isValidated}
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
          user={user}
        />
      </div>
      <TutorialLeaveButton />
    </>
  )
}