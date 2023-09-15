import { useForm } from 'react-hook-form'
import { css } from '../../../../styled-system/css'
import { hstack, vstack } from '../../../../styled-system/patterns'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthValidationSchema, TAuthValidationSchema } from '@/libs/validations/authValidation'
import { useMutateUser } from '@/api/hooks/user/useMutateUser'

export const SignUpForm = () => {
  const { signUpMutation, loginMutation } = useMutateUser()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthValidationSchema>({
    mode: 'onBlur',
    resolver: zodResolver(AuthValidationSchema as any),
  })

  const onSubmitSignUp = async (userCredential: TAuthValidationSchema) => {
    try {
      const res = await signUpMutation.mutateAsync(userCredential)
      if (res) {
        // サインアップ成功時、そのままログインする。
        loginMutation.mutate(userCredential)
      } else {
        throw new Error()
      }
    } catch (error) {
      alert(error)
    }
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
      onSubmit={handleSubmit(onSubmitSignUp)}
    >
      <div className={vstack({ alignItems: 'start', w: 'full' })}>
        <h2 className={css({ fontSize: '2xl', fontWeight: 'bold' })}>登録</h2>
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
