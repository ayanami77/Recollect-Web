import { useForm } from 'react-hook-form'
import { css } from '../../../../styled-system/css'
import { hstack, vstack } from '../../../../styled-system/patterns'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthValidationSchema, AuthValidationSchemaType } from '@/libs/validations/authValidation'
import { useMutateUser } from '@/api/hooks/user/useMutateUser'
import Link from 'next/link'

export const LoginForm = () => {
  const { loginMutation } = useMutateUser()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthValidationSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(AuthValidationSchema as any),
  })

  const onSubmitLogin = (userCredential: AuthValidationSchemaType) => {
    loginMutation.mutate(userCredential)
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
      onSubmit={handleSubmit(onSubmitLogin)}
    >
      <div className={vstack({ alignItems: 'start', w: 'full' })}>
        <h2 className={css({ fontSize: '2xl', fontWeight: 'bold' })}>ログイン</h2>
        <div className={vstack({ alignItems: 'start', gap: '18px', w: 'full' })}>
          <div className={vstack({ alignItems: 'start', w: 'full' })}>
            <label className={hstack({ fontSize: '14px' })}>
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
            {errors.userId?.message && (
              <p className={css({ fontSize: 'xs', color: 'cinnabar' })}>{errors.userId.message}</p>
            )}
          </div>
          <div className={vstack({ alignItems: 'start', w: 'full' })}>
            <label className={hstack({ fontSize: '14px' })}>
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
            {errors.password?.message && (
              <p className={css({ fontSize: 'xs', color: 'cinnabar' })}>
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
        <p className={css({ fontSize: '14px' })}>
          アカウントをもっていない方は
          <Link href={'/signup'}>
            <span className={css({ color: 'blue.400' })}>こちら</span>
          </Link>
          から
        </p>
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
