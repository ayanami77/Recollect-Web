import { FC, useState } from 'react'
import { Card, ProgressBar } from '@/components/tutorial'
import { hstack } from '../../../styled-system/patterns'

type Priod = '幼少期' | '小学生' | '中学生' | '高校生' | '大学生'

type Card = {
  priod: Priod
  title: string
  content: string
}

const Tutorial: FC = () => {
  const progressStepSize = 100 / 6
  const [curretValue, setCurrentValue] = useState<number>(progressStepSize)
  // const [cardPosition, setCardProsition] = useState<number>(0);
  // const [cardList, setCardList] = useState<Card[]>([]);

  const handleCountUp = () => {
    if (curretValue >= 100) return
    // setCardProsition(prevValue => Math.min(prevValue + 1, 4));
    setCurrentValue((prevValue) => Math.min(prevValue + progressStepSize, 100))
  }

  const handleCoutDown = () => {
    if (curretValue <= 0) return
    // setCardProsition(prevValue => Math.max(prevValue - 1, 0));
    setCurrentValue((prevValue) => Math.max(prevValue - progressStepSize, progressStepSize))
  }

  return (
    <>
      <ProgressBar currentValue={curretValue} />
      <div className={hstack({ justifyContent: 'center', mt: '30px' })}>
        <div
          onClick={() => {
            handleCoutDown()
          }}
        >
          カウントダウン
        </div>
        <Card />
        <div
          onClick={() => {
            handleCountUp()
          }}
        >
          カウントアップ
        </div>
      </div>
    </>
  )
}

export default Tutorial
