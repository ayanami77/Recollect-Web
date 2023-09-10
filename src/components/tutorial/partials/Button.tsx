import { m } from 'framer-motion'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { css } from '../../../../styled-system/css'
import { useRouter } from 'next/router'
import { Period as TPeriod } from '@/api/models'
import { useMutateCard } from '@/api/hooks/card/useMutateCard'

type Card = {
  period: TPeriod
  title: string
  content: string
}

type ButtonProps = {
  content: {
    cardList: Card[]
    cardPosition: number
    progressStepSize: number
    setCurrentValue: Dispatch<SetStateAction<number>>
    handleValidate: () => boolean
  }
}
export const Button: FC<ButtonProps> = ({ content }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { createCardMutation } = useMutateCard()

  const handleClick = () => {
    if (content.handleValidate()) return
    content.setCurrentValue((prevValue) => Math.min(prevValue + content.progressStepSize, 100))
    setIsLoading(true)
    content.cardList.forEach((card) => {
      createCardMutation.mutate({
        period: card.period,
        title: card.title,
        content: card.content,
      })
    })
    // TODO: 本当は全部レスポンスが成功した時にpushするようにしたいが、妥協
    setTimeout(() => {
      router.push('/history')
    }, 1500)
  }

  return (
    <m.button
      className={css({
        w: '200px',
        color: 'white',
        bg: isLoading ? 'dimGray' : 'dimBlue',
        rounded: 'lg',
        p: '10px',
        cursor: 'pointer',
        fontSize: '20px',
        fontWeight: 'bold',
        mt: '20px',
        visibility: content.cardPosition === 4 ? 'visible' : 'hidden',
      })}
      disabled={isLoading}
      onClick={() => handleClick()}
      whileTap={{ scale: isLoading ? 1 : 0.9 }}
    >
      {isLoading ? '読み込み中...' : '自分史を見る！'}
    </m.button>
  )
}
