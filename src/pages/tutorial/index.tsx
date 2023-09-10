import { useState } from 'react'
import { Button, Card, LeavingButton, ProgressBar, TransitionButton } from '@/components/tutorial'
import { center, hstack } from '../../../styled-system/patterns'
import { FadeInWrapper } from '@/components/common'
import { CommonMeta } from '@/components/common/meta'
import { Period as TPeriod } from '@/api/models'

type Card = {
  period: TPeriod
  title: string
  content: string
}

export default function Tutorial() {
  const progressStepSize = 100 / 6
  const [currentValue, setCurrentValue] = useState<number>(progressStepSize)
  const [cardPosition, setCardPosition] = useState<number>(0)
  const [cardList, setCardList] = useState<Card[]>([
    {
      period: '幼少期',
      title: '',
      content: '',
    },
    {
      period: '小学生',
      title: '',
      content: '',
    },
    {
      period: '中学生',
      title: '',
      content: '',
    },
    {
      period: '高校生',
      title: '',
      content: '',
    },
    {
      period: '現在まで',
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
      <CommonMeta title={'Recollect - チュートリアル'} description={'チュートリアルページです。'} />
      <div>
        <ProgressBar currentValue={currentValue} />
        <FadeInWrapper>
          <div className={hstack({ justifyContent: 'center', mt: '30px', gap: '20' })}>
            <TransitionButton
              content={{ movement: 'prev', onClick: handlePrev, cardPosition: cardPosition }}
            />
            <Card
              content={{
                cardPosition: cardPosition,
                setCardList: setCardList,
                cardList: cardList,
                placeholderText: questions[cardPosition],
                isValidated: isValidated,
              }}
            />
            <TransitionButton content={{ movement: 'next', onClick: handleNext, cardPosition }} />
          </div>
        </FadeInWrapper>
        <div className={center()}>
          <Button
            content={{
              cardList: cardList,
              cardPosition: cardPosition,
              setCurrentValue: setCurrentValue,
              progressStepSize: progressStepSize,
              handleValidate: handleValidate,
            }}
          />
        </div>
        <LeavingButton />
      </div>
    </>
  )
}
