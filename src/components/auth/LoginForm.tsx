import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthValidationSchema, TAuthValidationSchema } from '@/libs/validations/authValidation'
import { useMutateUser } from '@/api/hooks/user/useMutateUser'
import { AuthFormContainer } from './AuthFormContainer'
import { AuthFormControl } from './AuthFormControl'

export const LoginForm = () => {
  const { loginMutation } = useMutateUser()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthValidationSchema>({
    mode: 'onBlur',
    resolver: zodResolver(AuthValidationSchema),
  })

  const onSubmitLogin = (userCredential: TAuthValidationSchema) => {
    loginMutation.mutate(userCredential)
  }

  return (
    <AuthFormContainer formType={'login'} onSubmit={handleSubmit(onSubmitLogin)}>
      <AuthFormControl errors={errors} register={register} usage={'userId'} />
      <AuthFormControl errors={errors} register={register} usage={'password'} />
    </AuthFormContainer>
  )
}
