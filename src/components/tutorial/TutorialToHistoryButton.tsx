import { m } from 'framer-motion'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { css } from '../../../styled-system/css'
import { useRouter } from 'next/router'
import { Period as TPeriod } from '@/api/models/card.model'
import { useMutateCard } from '@/api/hooks/card/useMutateCard'
import { useToastStore } from '@/store/useToastStore'
import { Session } from 'next-auth'

type Card = {
  period: TPeriod
  title: string
  content: string
}

type TutorialToHistoryButtonProps = {
  content: {
    cardList: Card[]
    cardPosition: number
    progressStepSize: number
    setCurrentValue: Dispatch<SetStateAction<number>>
    handleValidate: () => boolean
  }
  user: Session['user']
}
export const TutorialToHistoryButton: FC<TutorialToHistoryButtonProps> = ({ content, user }) => {
  const router = useRouter()
  const toastStore = useToastStore()
  const [isLoading, setIsLoading] = useState(false)
  const { createCardsMutation } = useMutateCard()

  const handleSubmit = async () => {
    if (content.handleValidate()) return
    content.setCurrentValue((prevValue) => Math.min(prevValue + content.progressStepSize, 100))
    setIsLoading(true)
    try {
      const res = await createCardsMutation.mutateAsync({
        cardData: content.cardList,
        accessToken: user.access_token || '',
      })
      if (res) {
        toastStore.show('自分史を作成しました', 'success')
        setTimeout(() => {
          toastStore.hide()
        }, 2000)
      }
    } catch (error) {
      toastStore.show('自分史を作成できませんでした', 'error')
      setTimeout(() => {
        toastStore.hide()
      }, 2000)
    } finally {
      setIsLoading(false)
      router.push('/history') // TODO:成功失敗関わらず、historyへ送るようにしておく。
    }
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
      onClick={() => handleSubmit()}
      whileTap={{ scale: isLoading ? 1 : 0.9 }}
    >
      {isLoading ? '読み込み中...' : '自分史を見る！'}
    </m.button>
  )
}
