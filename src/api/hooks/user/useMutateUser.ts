import { useError } from '../utils/useError'
import { useMutation } from '@tanstack/react-query'
import { UserCredential, userFactory } from '@/api/models/user.model'
import { useRouter } from 'next/router'

export const useMutateUser = () => {
  const router = useRouter()
  const { switchErrorHandling } = useError()

  const signUpMutation = useMutation(
    async (userCredential: UserCredential) => await userFactory().signUp(userCredential),
    {
      onSuccess: () => {},
      onError: (err: any) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message)
        } else {
          switchErrorHandling(err.response.data)
        }
      },
    },
  )

  const loginMutation = useMutation(
    async (userCredential: UserCredential) => {
      await userFactory().login(userCredential)
    },
    {
      onSuccess: () => {
        router.push('/history')
      },
      onError: (err: any) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message)
        } else {
          switchErrorHandling(err.response.data)
        }
      },
    },
  )

  const logoutMutation = useMutation(
    async () => {
      await userFactory().logout()
    },
    {
      onSuccess: () => {
        router.push('/')
      },
      onError: (err: any) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message)
        } else {
          switchErrorHandling(err.response.data)
        }
      },
    },
  )

  return { signUpMutation, loginMutation, logoutMutation }
}
