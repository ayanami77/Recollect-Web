import Link from 'next/link'
import { css } from '../../../../../styled-system/css'
import { hstack } from '../../../../../styled-system/patterns'

export const ViewButtons = () => {
  return (
    <div className={hstack({ gap: '24px', justify: 'end', p: '24px' })}>
      <Link
        href={'/history'}
        className={css({
          minW: '180px',
          p: '8px',
          fontWeight: 'bold',
          fontSize: '20px',
          bg: 'gray',
          color: 'white',
          rounded: '12px',
          textAlign: 'center',
          cursor: 'pointer',
        })}
      >
        時系列ビュー
      </Link>
      <Link
        href={'/analysis'}
        className={css({
          minW: '180px',
          p: '8px',
          fontWeight: 'bold',
          fontSize: '20px',
          bg: 'dimBlue',
          color: 'white',
          rounded: '12px',
          textAlign: 'center',
          cursor: 'pointer',
        })}
      >
        分析ビュー
      </Link>
    </div>
  )
}
