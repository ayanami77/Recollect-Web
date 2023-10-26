import { useMutation } from '@tanstack/react-query'
import { UserCredential, userFactory } from '@/api/models/user.model'
import { useRouter } from 'next/router'
import { queryClient } from '@/api/clients/queryClient'
import { FetchError } from '@/api/clients/utils/fetchError'

export const useMutateUser = () => {
  const router = useRouter()

  const signUpMutation = useMutation(
    async (userCredential: UserCredential) => await userFactory().signUp(userCredential),
    {
      onSuccess: () => {},
      onError: (err: FetchError) => {
        console.log(err)
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
      onError: (err: FetchError) => {
        console.log(err)
      },
    },
  )

  const logoutMutation = useMutation(
    async () => {
      await userFactory().logout()
    },
    {
      onSuccess: () => {
        queryClient.clear() // 全てのcacheを削除する。
        router.push('/')
      },
      onError: (err: FetchError) => {
        console.log(err)
      },
    },
  )

  return { signUpMutation, loginMutation, logoutMutation }
}
