import { FC, useState } from 'react'
import {
  Button,
  Card,
  LeavingButton,
  ProgressBar,
  TransitionButton,
  Assistant,
} from '@/components/tutorial'
import { center, hstack } from '../../../styled-system/patterns'
import { css } from '../../../styled-system/css'

type Priod = '幼少期' | '小学生' | '中学生' | '高校生' | '大学生'

type Card = {
  priod: Priod
  subTitle: string
  content: string
}

const Tutorial: FC = () => {
  const progressStepSize = 100 / 6
  const [curretValue, setCurrentValue] = useState<number>(progressStepSize)
  const [cardPosition, setCardProsition] = useState<number>(0)
  const [cardList, setCardList] = useState<Card[]>([
    {
      priod: '幼少期',
      subTitle: '',
      content: '',
    },
    {
      priod: '小学生',
      subTitle: '',
      content: '',
    },
    {
      priod: '中学生',
      subTitle: '',
      content: '',
    },
    {
      priod: '高校生',
      subTitle: '',
      content: '',
    },
    {
      priod: '大学生',
      subTitle: '',
      content: '',
    },
  ])

  const handleNext = () => {
    if (curretValue >= 100) return
    setCardProsition((prevValue) => Math.min(prevValue + 1, 4))
    setCurrentValue((prevValue) => Math.min(prevValue + progressStepSize, 100))
  }

  const handlePrev = () => {
    if (curretValue <= 0) return
    setCardProsition((prevValue) => Math.max(prevValue - 1, 0))
    setCurrentValue((prevValue) => Math.max(prevValue - progressStepSize, progressStepSize))
  }

  return (
    <div className={css({ position: 'relative' })}>
      <ProgressBar currentValue={curretValue} />
      <div className={hstack({ justifyContent: 'center', mt: '30px', gap: '20' })}>
        <TransitionButton
          content={{ movement: 'prev', onClick: handlePrev, cardPosition: cardPosition }}
        />
        <Card
          content={{ cardPostion: cardPosition, setCardList: setCardList, cardList: cardList }}
        />
        <TransitionButton content={{ movement: 'next', onClick: handleNext, cardPosition }} />
      </div>
      <div className={center()}>
        <Button
          content={{
            cardPosition: cardPosition,
            setCurrentValue: setCurrentValue,
            progressStepSize: progressStepSize,
          }}
        />
      </div>
      <LeavingButton />
      <Assistant content={{ cardPosition: cardPosition }} />
    </div>
  )
}

export default Tutorial
