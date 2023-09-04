import { m } from 'framer-motion'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { css } from '../../../../styled-system/css'
import { useRouter } from 'next/router'

type ButtonProps = {
  content: {
    cardPosition: number
    progressStepSize: number
    setCurrentValue: Dispatch<SetStateAction<number>>
  }
}
export const Button: FC<ButtonProps> = ({ content }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleClick = () => {
    content.setCurrentValue((prevValue) => Math.min(prevValue + content.progressStepSize, 100))
    setIsLoading(true)
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
