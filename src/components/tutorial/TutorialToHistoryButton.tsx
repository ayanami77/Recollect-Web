import { m } from 'framer-motion'
import { Dispatch, FC, SetStateAction, useReducer } from 'react'
import { css } from '../../../styled-system/css'
import { useRouter } from 'next/router'
import { Period as TPeriod } from '@/api/models/card.model'
import { useMutateCard } from '@/api/hooks/card/useMutateCard'
import { useToastStore } from '@/store/useToastStore'

type Card = {
  period: TPeriod
  title: string
  content: string
}

type TutorialToHistoryButtonProps = {
  cardList: Card[]
  cardPosition: number
  progressStepSize: number
  setCurrentValue: Dispatch<SetStateAction<number>>
  handleValidate: () => boolean
}
export const TutorialToHistoryButton: FC<TutorialToHistoryButtonProps> = (props) => {
  const { cardList, cardPosition, progressStepSize, setCurrentValue, handleValidate } = props
  const router = useRouter()
  const toastStore = useToastStore()
  const [submitted, updateSubmitted] = useReducer(() => true, false)
  const { createCardsMutation } = useMutateCard()

  const handleSubmit = async () => {
    if (handleValidate()) {
      return
    }

    setCurrentValue((prevValue) => Math.min(prevValue + progressStepSize, 100))
    updateSubmitted()

    try {
      const res = await createCardsMutation.mutateAsync({
        cardData: cardList,
      })
      if (res) {
        toastStore.show('自分史を作成しました', 'success')
        toastStore.hide()
      }
    } catch (error) {
      toastStore.show('自分史を作成できませんでした', 'error')
      toastStore.hide()
    } finally {
      // 成功失敗関わらず、historyへ送るようにしておく
      router.push('/history')
    }
  }

  return (
    <m.button
      className={css({
        w: '200px',
        color: 'white',
        bg: submitted ? 'dimGray' : 'dimBlue',
        rounded: 'lg',
        p: '10px',
        cursor: 'pointer',
        fontSize: '20px',
        fontWeight: 'bold',
        mt: '20px',
        visibility: cardPosition === 4 ? 'visible' : 'hidden',
      })}
      disabled={submitted}
      onClick={() => handleSubmit()}
      whileTap={{ scale: submitted ? 1 : 0.9 }}
    >
      {submitted ? '読み込み中...' : '自分史を見る！'}
    </m.button>
  )
}
