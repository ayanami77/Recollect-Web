import { useState } from 'react'
import { center, hstack } from '../../../styled-system/patterns'
import { FadeInWrapper } from '@/components/common'
import { CommonMeta } from '@/components/common/meta'
import { Period as TPeriod } from '@/api/models/card.model'
import {
  TutorialLeaveButton,
  TutorialPCSwitchButton,
  TutorialToHistoryButton,
  TutorialCard,
  TutorialProgressBar,
} from '@/components/tutorial'
import { GetServerSideProps } from 'next'
import { Session, getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'

type Card = {
  period: TPeriod
  title: string
  content: string
}

type Props = {
  user: Session['user']
}

export default function Tutorial({ user }: Props) {
  const progressStepSize = 100 / 6
  const [currentValue, setCurrentValue] = useState<number>(progressStepSize)
  const [cardPosition, setCardPosition] = useState<number>(0)
  const [cardList, setCardList] = useState<Card[]>([
    {
      period: '0',
      title: '',
      content: '',
    },
    {
      period: '1',
      title: '',
      content: '',
    },
    {
      period: '2',
      title: '',
      content: '',
    },
    {
      period: '3',
      title: '',
      content: '',
    },
    {
      period: '4',
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
        <TutorialProgressBar currentValue={currentValue} />
        <FadeInWrapper>
          <div className={hstack({ justifyContent: 'center', mt: '30px', gap: '20' })}>
            <TutorialPCSwitchButton
              movement='prev'
              onClick={handlePrev}
              cardPosition={cardPosition}
            />
            <TutorialCard
              content={{
                cardPosition: cardPosition,
                setCardList: setCardList,
                cardList: cardList,
                placeholderText: questions[cardPosition],
                isValidated: isValidated,
              }}
            />
            <TutorialPCSwitchButton
              movement='next'
              onClick={handleNext}
              cardPosition={cardPosition}
            />
          </div>
        </FadeInWrapper>
        <div className={center()}>
          <TutorialToHistoryButton
            content={{
              cardList: cardList,
              cardPosition: cardPosition,
              setCurrentValue: setCurrentValue,
              progressStepSize: progressStepSize,
              handleValidate: handleValidate,
            }}
            user={user}
          />
        </div>
        <TutorialLeaveButton />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions)
  const user = session?.user

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  return {
    props: { user },
  }
}
