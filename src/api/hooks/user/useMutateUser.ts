import { useMutation } from '@tanstack/react-query'
import { UserCredential, userFactory } from '@/api/models/user.model'
import { useRouter } from 'next/router'
import { queryClient } from '@/api/clients/queryClient'
import { FetchError } from '@/api/clients/utils/fetchError'

export const useMutateUser = () => {
  const router = useRouter()

  const signUpMutation = useMutation(
    async (params: { userCredential: UserCredential; accessToken: string }) => {
      const { userCredential, accessToken } = params
      return await userFactory().signUp(userCredential, accessToken)
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

  const analyzeMutation = useMutation(
    async (params: { userCredential: UserCredential; accessToken: string }) => {
      const { userCredential, accessToken } = params
      return await userFactory().analyze(userCredential, accessToken)
    },
    {
      onSuccess: (res) => {
        const loggedInUser = queryClient.getQueryData(['user'])
        if (loggedInUser) {
          queryClient.setQueriesData(['user'], {
            // TODO: 要検証
            comprehensiveAnalysisResult: res.comprehensiveAnalysisResult,
            comprehensiveAnalysisScore: res.comprehensiveAnalysisScore,
            ...loggedInUser,
          })
        }
      },
      onError: (err: FetchError) => {
        console.log(err)
      },
    },
  )

  const idDuplicateMutation = useMutation(
    async (params: { userCredential: UserCredential; accessToken: string }) => {
      const { userCredential, accessToken } = params
      return await userFactory().idDuplicateCheck(userCredential, accessToken)
    },
    {
      onError: (err: FetchError) => {
        console.log(err)
      },
    },
  )

  const emailDuplicateMutation = useMutation(
    async (params: { userCredential: UserCredential; accessToken: string }) => {
      const { userCredential, accessToken } = params
      return await userFactory().emailDuplicateCheck(userCredential, accessToken)
    },
    {
      onError: (err: FetchError) => {
        console.log(err)
      },
    },
  )
  return {
    signUpMutation,
    idDuplicateMutation,
    emailDuplicateMutation,
    analyzeMutation,
  }
}
