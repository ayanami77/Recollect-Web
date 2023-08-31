import { motion } from 'framer-motion'
import { FC } from 'react'
import { css } from '../../../../styled-system/css'
import { useRouter } from 'next/router'

export const LeavingButton: FC = () => {
  const router = useRouter()
  const handleClick = () => {
    if (window.confirm('チュートリアルを終了しますか？')) {
      router.push('/')
    }
  }
  return (
    <motion.button
      className={css({
        position: 'fixed',
        left: '20px',
        bottom: '20px',
        color: 'dimBlue',
        border: 'solid 1px',
        borderColor: 'dimBlue',
        rounded: 'lg',
        cursor: 'pointer',
        fontSize: '15px',
        p: '10px',
      })}
      onClick={() => handleClick()}
      whileTap={{ scale: 0.9 }}
    >
      チュートリアルを退出する
    </motion.button>
  )
}
