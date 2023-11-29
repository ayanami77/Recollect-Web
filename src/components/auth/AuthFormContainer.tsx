import Link from 'next/link'
import { css } from '../../../styled-system/css'
import { vstack } from '../../../styled-system/patterns'
import { BaseSyntheticEvent, FC, ReactNode } from 'react'

type TFormType = 'signup' | 'login'
type AuthFormContainerProps = {
  children: ReactNode
  formType: TFormType
  onSubmit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
}

const makeFormContainer = (props: AuthFormContainerProps) => {
  const { formType } = props
  switch (formType) {
    case 'signup':
      return {
        title: 'アカウント登録',
      }
    case 'login':
      return {
        title: 'ログイン',
        link: (
          <p className={css({ fontSize: '14px' })}>
            アカウントをお持ちでない方は
            <Link href={'/signup'}>
              <span className={css({ color: 'blue.400' })}>こちら</span>
            </Link>
            から
          </p>
        ),
      }
  }
}

export const AuthFormContainer: FC<AuthFormContainerProps> = (props) => {
  const { children, onSubmit } = props
  const { title, link } = makeFormContainer(props)
  return (
    <form
      className={css({
        w: 'full',
        maxW: '500px',
        mx: 'auto',
        mt: '90px',
        rounded: '2xl',
      })}
      onSubmit={onSubmit}
    >
      <div className={vstack({ alignItems: 'start', w: 'full' })}>
        <h2 className={css({ fontSize: '2xl', fontWeight: 'bold' })}>{title}</h2>
        <div className={vstack({ alignItems: 'start', gap: '18px', w: 'full' })}>
          {/* childrenにはAuthFormControlが入る */}
          {children}
        </div>
        {link}
        <button
          className={css({
            w: 'full',
            p: '10px',
            bg: 'dimBlue',
            color: 'white',
            fontWeight: 'bold',
            rounded: 'xl',
            mt: '32px',
            cursor: 'pointer',
          })}
        >
          はじめる
        </button>
      </div>
    </form>
  )
}
