import Image from 'next/image'
import { m } from 'framer-motion'
import { center, vstack } from '../../../../../styled-system/patterns'
import { css } from '../../../../../styled-system/css'

export const Analyzing = () => {
  return (
    <div className={center({ w: 'full', h: '280px' })}>
      <m.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={vstack({ bg: 'blue.100', p: '12px', rounded: '3xl' })}
      >
        <p
          className={css({
            minW: '140px',
            fontSize: '2xl',
            fontWeight: 'bold',
            textAlign: 'center',
          })}
        >
          分析中...
        </p>
        <m.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, repeatDelay: 1, duration: 0.5 }}
        >
          <Image src={'/bookshelf.png'} alt={'マスコットキャラクター'} width={75} height={75} />
        </m.div>
      </m.div>
    </div>
  )
}
