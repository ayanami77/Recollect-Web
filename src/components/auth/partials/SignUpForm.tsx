import { useForm } from 'react-hook-form'
import { css } from '../../../../styled-system/css'
import { hstack, vstack } from '../../../../styled-system/patterns'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthValidationSchema, AuthValidationSchemaType } from '@/libs/validations/authValidation'
import { ReactNode } from 'react'
import { useMutateUser } from '@/api/hooks/user/useMutateUser'

export const SignUpForm = () => {
  const { signUpMutation } = useMutateUser()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthValidationSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(AuthValidationSchema as any),
  })

  const onSubmit = (userCredential: AuthValidationSchemaType) => {
    signUpMutation.mutate(userCredential)
  }

  return (
    <form
      className={css({
        w: '500px',
        p: '28px',
        mx: 'auto',
        mt: '90px',
        bg: 'white',
        rounded: '2xl',
        shadow: 'xl',
      })}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={vstack({ alignItems: 'start', w: 'full' })}>
        <h2 className={css({ fontSize: '2xl', fontWeight: 'bold' })}>登録</h2>
        <div className={vstack({ alignItems: 'start', w: 'full' })}>
          <label className={hstack({ fontSize: 'xs' })}>
            <span>ユーザーID</span>
            <span className={css({ color: 'cinnabar' })}>必須</span>
          </label>
          <input
            type='text'
            className={css({
              w: 'full',
              p: '6px',
              rounded: 'md',
              borderColor: 'dimgray',
              borderWidth: '1px',
              bg: 'slate.100',
              _placeholder: {
                fontSize: 'xs',
              },
            })}
            placeholder='e.g. taro1123'
            {...register('userId')}
          />
          <p className={css({ fontSize: 'xs', color: 'cinnabar' })}>
            {errors.userId?.message as ReactNode}
          </p>
        </div>
        <div className={vstack({ alignItems: 'start', w: 'full' })}>
          <label className={hstack({ fontSize: 'xs' })}>
            <span>パスワード</span>
            <span className={css({ color: 'cinnabar' })}>必須</span>
          </label>
          <input
            type='password'
            className={css({
              w: 'full',
              p: '6px',
              rounded: 'md',
              borderColor: 'dimgray',
              borderWidth: '1px',
              bg: 'slate.100',
              _placeholder: {
                fontSize: 'xs',
              },
            })}
            placeholder='半角英数字6文字以上'
            {...register('password')}
          />
          <p className={css({ fontSize: 'xs', color: 'cinnabar' })}>
            {errors.password?.message as ReactNode}
          </p>
        </div>
        <button
          className={css({
            w: 'full',
            p: '10px',
            bg: 'dimBlue',
            color: 'white',
            fontWeight: 'bold',
            rounded: 'xl',
            mt: '20px',
            cursor: 'pointer',
          })}
        >
          はじめる
        </button>
      </div>
    </form>
  )
}
