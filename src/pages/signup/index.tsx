import { apiClient } from '@/api/clients/apiClient'
import { useMutateUser } from '@/api/hooks/user/useMutateUser'
import { AuthFormContainer, AuthFormControl } from '@/components/auth'
import { CommonMeta, ContentsWrapper } from '@/components/common'
import { TAuthValidationSchema, AuthValidationSchema } from '@/libs/validations/authValidation'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { zodResolver } from '@hookform/resolvers/zod'
import { GetServerSideProps } from 'next'
import { Session, getServerSession } from 'next-auth'
import { useForm } from 'react-hook-form'

type Props = {
  user: Session['user']
}

const Signup = ({ user }: Props) => {
  const { signUpMutation, idDuplicateMutation } = useMutateUser()
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
      const isExistUserId = await idDuplicateMutation.mutateAsync({
        userCredential: { userId: userCredential.userId },
        accessToken: user.access_token || '',
      })

      if (isExistUserId) {
        alert('既に使用されているユーザーIDです')
        return
      }

      await signUpMutation.mutateAsync({
        userCredential: {
          userId: userCredential.userId,
          sub: user.sub || '',
          email: user.email || '',
        },
        accessToken: user.access_token || '',
      })
    } catch (error) {
      alert(error)
    }
  }
  return (
    <>
      <CommonMeta
        title={'Recollect - アカウント登録'}
        description={'Recollectの利用にあたって、アカウント登録をする。'}
      />
      <ContentsWrapper>
        <AuthFormContainer formType={'signup'} onSubmit={handleSubmit(onSubmitSignUp)}>
          <AuthFormControl errors={errors} register={register} usage={'userId'} />
        </AuthFormContainer>
      </ContentsWrapper>
    </>
  )
}

export default Signup

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions)
  const user = session?.user

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  const isExistUser = await apiClient.post(
    '/users/email-duplicate-check',
    {
      accessToken: session.user.access_token || '',
    },
    {
      email: session?.user.email,
    },
  )
  if (isExistUser) {
    return {
      redirect: {
        destination: '/history',
        permanent: false,
      },
    }
  }

  return {
    props: { user },
  }
}
