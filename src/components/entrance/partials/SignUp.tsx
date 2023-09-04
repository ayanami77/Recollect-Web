import Link from 'next/link'
import { css } from '../../../../styled-system/css'

export const SignUp = () => {
  return (
    <div className={css({ textAlign: 'center', mt: '96px' })}>
      <Link href={'/signup'}>
        <span
          className={css({
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
    </div>
  )
}
