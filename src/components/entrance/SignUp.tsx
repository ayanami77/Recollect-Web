import Link from 'next/link'
import { css } from '../../../styled-system/css'
import { vstack } from '../../../styled-system/patterns'

export const SignUp = () => {
  return (
    <div className={vstack({ w: 'fit', mx: 'auto', mt: '24px', gap: '24px' })}>
      <Link href={'/signup'}>
        <span
          className={css({
            fontWeight: 'bold',
            fontSize: 'xl',
            border: 'solid',
            borderColor: 'skyBlue',
            color: 'skyBlue',
            p: '12px',
            rounded: 'lg',
            cursor: 'pointer',
            md: {
              fontSize: '2xl',
            },
            _hover: {
              bg: 'skyBlue',
              color: 'white',
              borderColor: 'skyBlue',
              transition: 'all 0.15s',
            },
          })}
        >
          始めてみる
        </span>
      </Link>
      <p className={css({ fontSize: '14px' })}>※利用開始には、アカウントの作成が必要となります。</p>
    </div>
  )
}
