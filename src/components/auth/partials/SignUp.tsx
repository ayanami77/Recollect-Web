import { useForm } from 'react-hook-form'
import { css } from '../../../../styled-system/css'
import { hstack, vstack } from '../../../../styled-system/patterns'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  SignUpValidationSchema,
  SignUpValidationSchemaType,
} from '@/libs/validations/signUpValidation'
import { ReactNode } from 'react'

export const SignUp = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValidationSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(SignUpValidationSchema as any),
  }) //TODO: 苦渋のキャスティング

  const onSubmit = (data: SignUpValidationSchemaType) => {
    console.log(data)
  }

  return (
    <form
      className={css({
        w: '500px',
        p: '28px',
        mx: 'auto',
        mt: '180px',
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
