import { css } from '../../../styled-system/css'
import { vstack } from '../../../styled-system/patterns'
import { BaseSyntheticEvent, FC, ReactNode } from 'react'
import { signOut } from 'next-auth/react'
import { match } from 'ts-pattern'

type TFormType = 'signup'
type AuthFormContainerProps = {
  children: ReactNode
  formType: TFormType
  onSubmit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
}

const makeFormContainer = (props: AuthFormContainerProps) => {
  const { formType } = props
  return match(formType)
    .with('signup', () => {
      return { title: 'アカウント登録' }
    })
    .exhaustive()
}

export const AuthFormContainer: FC<AuthFormContainerProps> = (props) => {
  const { children, onSubmit } = props
  const { title } = makeFormContainer(props)

  const onSubmitLogout = async () => {
    // セッションが削除されるため、SSRによって/signinへリダイレクトされる。
    await signOut()
  }

  return (
    <div
      className={css({
        maxW: '500px',
        w: 'full',
        mx: 'auto',
        mt: '90px',
      })}
    >
      <form onSubmit={onSubmit}>
        <div className={vstack({ alignItems: 'start', w: 'full' })}>
          <h2 className={css({ fontSize: '2xl', fontWeight: 'bold' })}>{title}</h2>
          <div className={vstack({ alignItems: 'start', gap: '18px', w: 'full' })}>
            {/* childrenにはAuthFormControlが入る */}
            {children}
          </div>
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
      <div className={css({ w: 'fit-content', mx: 'auto', mt: '48px' })}>
        <button
          className={css({
            color: 'black',
            cursor: 'pointer',
            _hover: { textDecoration: 'underline' },
          })}
          onClick={onSubmitLogout}
        >
          アカウント登録を中止する
        </button>
      </div>
    </div>
  )
}
