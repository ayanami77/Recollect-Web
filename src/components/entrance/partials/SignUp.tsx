import Link from 'next/link'
import { css } from '../../../../styled-system/css'
import { vstack } from '../../../../styled-system/patterns'

export const SignUp = () => {
  return (
    <div className={vstack({ w: 'fit', mx: 'auto', mt: '24px', gap: '24px' })}>
      <Link href={'/signup'}>
        <span
          className={css({
            display: 'block',
            border: 'solid',
            p: '12px',
            rounded: 'xl',
            fontSize: '2xl',
            color: 'skyBlue',
            _hover: { bg: 'skyBlue', color: 'white', transition: 'all 0.15s' },
          })}
        >
          始めてみる
        </span>
      </Link>
      <p className={css({ fontSize: '14px' })}>
        すでにアカウントを持っている方は
        <Link href={'/login'}>
          <span className={css({ color: 'blue.400' })}>こちら</span>
        </Link>
        からログイン
      </p>
    </div>
  )
}
