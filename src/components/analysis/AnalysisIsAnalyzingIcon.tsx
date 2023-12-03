import Image from 'next/image'
import { m } from 'framer-motion'
import { css } from '../../../styled-system/css'
import { center, vstack } from '../../../styled-system/patterns'

export const AnalysisIsAnalyzingIcon = () => {
  return (
    <div className={center({ w: 'full', h: 'full' })}>
      <m.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={vstack({ bg: 'blue.200', p: '12px', rounded: '3xl' })}
      >
        <span
          className={css({
            minW: '132px',
            fontSize: '2xl',
            fontWeight: 'bold',
            textAlign: 'center',
          })}
        >
          分析中...
        </span>
        <m.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, repeatDelay: 1, duration: 0.5 }}
        >
          <Image src={'/img/bookshelf.png'} alt={'マスコットキャラクター'} width={75} height={75} />
        </m.div>
      </m.div>
    </div>
  )
}
