import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { css } from '../../../styled-system/css'
import { hstack, vstack } from '../../../styled-system/patterns'
import { FC } from 'react'

type TUsage = 'userId' | 'password'
type AuthFormControlProps = {
  errors: FieldErrors<{
    userId: string
    password: string
  }>
  register: UseFormRegister<{
    userId: string
    password: string
  }>
  usage: TUsage
}

const makeFormControl = (props: AuthFormControlProps) => {
  const { errors, register, usage } = props
  switch (usage) {
    case 'userId':
      return {
        label: 'ユーザ―ID',
        type: 'text',
        register: register(usage),
        errorMessage: errors.userId?.message && (
          <p className={css({ fontSize: 'xs', color: 'cinnabar' })}>{errors.userId.message}</p>
        ),
      }
    case 'password':
      return {
        label: 'パスワード',
        type: 'password',
        register: register(usage),
        errorMessage: errors.password?.message && (
          <p className={css({ fontSize: 'xs', color: 'cinnabar' })}>{errors.password.message}</p>
        ),
      }
  }
}

export const AuthFormControl: FC<AuthFormControlProps> = (props) => {
  const { label, errorMessage, register, type } = makeFormControl(props)
  return (
    <div className={vstack({ alignItems: 'start', w: 'full' })}>
      <label className={hstack({ fontSize: '14px' })}>
        <span>{label}</span>
        <span className={css({ color: 'cinnabar' })}>必須</span>
      </label>
      <input
        type={type}
        className={css({
          w: 'full',
          p: '6px',
          rounded: 'md',
          bg: 'slate.50',
          borderWidth: '1px',
          borderColor: 'slate.500',
          outline: 'none',
          _placeholder: {
            fontSize: 'xs',
          },
          _focus: {
            borderWidth: '2px',
            borderColor: 'blue.400',
          },
        })}
        placeholder='e.g. taro1123'
        {...register}
      />
      {errorMessage}
    </div>
  )
}
