import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthValidationSchema, TAuthValidationSchema } from '@/libs/validations/authValidation'
import { useMutateUser } from '@/api/hooks/user/useMutateUser'
import { AuthFormControl } from './AuthFormControl'
import { AuthFormContainer } from './AuthFormContainer'

export const SignupForm = () => {
  const { signUpMutation, loginMutation } = useMutateUser()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthValidationSchema>({
    mode: 'onBlur',
    resolver: zodResolver(AuthValidationSchema),
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
    <AuthFormContainer formType={'signup'} onSubmit={handleSubmit(onSubmitSignUp)}>
      <AuthFormControl errors={errors} register={register} usage={'userId'} />
      <AuthFormControl errors={errors} register={register} usage={'password'} />
    </AuthFormContainer>
  )
}
