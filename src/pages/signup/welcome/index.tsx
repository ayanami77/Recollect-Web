import { apiClient } from "@/api/clients/apiClient";
import { useMutateUser } from "@/api/hooks/user/useMutateUser";
import { AuthFormContainer } from "@/components/auth/AuthFormContainer";
import { AuthFormControl } from "@/components/auth/AuthFormControl";
import { TAuthValidationSchema, AuthValidationSchema } from "@/libs/validations/authValidation";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetServerSideProps } from "next";
import { Session, getServerSession } from "next-auth";
import email from "next-auth/providers/email";
import { useForm } from "react-hook-form";

interface Props {
  session: Session
}

export default function Welcome({ session }: Props) {

  const { signUpMutation, IdDuplicateMutation } = useMutateUser()
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
      const isExistUserId = await IdDuplicateMutation.mutateAsync(userCredential.userId)
      if (isExistUserId) {
        alert('既に使用されているユーザーIDです')
        return
      }
      const res = await signUpMutation.mutateAsync(userCredential)
      if (res) {
        console.log(res)
      } else {
        throw new Error()
      }
    } catch (error) {
      alert(error)
    }
  }
  return (
    <AuthFormContainer formType={'oauth'} onSubmit={handleSubmit(onSubmitSignUp)}>
      <AuthFormControl errors={errors} register={register} usage={'userId'} />  
    </AuthFormContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }
  // const isExistUser =  await apiClient.post('/users/email_duplicate_check',{accessToken: session.user.access_token || ""}, {
  //   email: session?.user.email,
  // })
  const isExistUser = false
  if (isExistUser) {
    return {
      redirect: {
        destination: '/history',
        permanent: false,
      }
    }
  }
	return {
		props: { session }
	}
}