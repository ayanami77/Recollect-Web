import { useForm } from 'react-hook-form'
import { css } from '../../../../styled-system/css'
import { hstack, vstack } from '../../../../styled-system/patterns'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthValidationSchema, AuthValidationSchemaType } from '@/libs/validations/authValidation'
import { ReactNode } from 'react'
import { useRouter } from 'next/router'

export const LoginForm = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthValidationSchemaType>({
    mode: 'onBlur',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(AuthValidationSchema as any),
  }) //TODO: 苦渋のキャスティング

  const onSubmit = (data: AuthValidationSchemaType) => {
    console.log(data)
    router.push('/history')
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
        <h2 className={css({ fontSize: '2xl', fontWeight: 'bold' })}>ログイン</h2>
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
            })}
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
            })}
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
