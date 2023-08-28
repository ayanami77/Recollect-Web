import Image from 'next/image'
import { motion } from 'framer-motion'
import { vstack } from '../../../../../styled-system/patterns'
import { css } from '../../../../../styled-system/css'

{
  /* TODO: 分析中のアニメーション */
}
export const Analyzing = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={vstack({ bg: 'blue.100', p: '12px', rounded: '3xl' })}
    >
      <p
        className={css({ minW: '140px', fontSize: '2xl', fontWeight: 'bold', textAlign: 'center' })}
      >
        分析中...
      </p>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, repeatDelay: 1, duration: 0.5 }}
      >
        <Image src={'/bookshelf.png'} alt={'マスコットキャラクター'} width={75} height={75} />
      </motion.div>
    </motion.div>
  )
}
