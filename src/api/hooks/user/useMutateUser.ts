import { useMutation } from '@tanstack/react-query'
import { User, userFactory } from '@/api/models/user.model'
import { useRouter } from 'next/router'
import { queryClient } from '@/api/clients/queryClient'
import { FetchError } from '@/api/clients/utils/fetchError'
import {
  EmailDuplicateCheckRequest,
  IdDuplicateCheckRequest,
  SignupRequest,
} from '@/api/schemas/types/user.type'

export const useMutateUser = () => {
  const router = useRouter()

  const signUpMutation = useMutation(
    async (params: { userCredential: SignupRequest; accessToken: string }) => {
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
    async (params: { accessToken: string }) => {
      const { accessToken } = params
      return await userFactory().analyze(accessToken)
    },
    {
      onSuccess: (res) => {
        const loggedInUser = queryClient.getQueryData<User>(['user'])
        if (loggedInUser) {
          queryClient.setQueriesData(['user'], {
            userId: loggedInUser.userId,
            userName: loggedInUser.userName,
            comprehensiveAnalysisResult: res.comprehensiveAnalysisResult,
            comprehensiveAnalysisScore: res.comprehensiveAnalysisScore,
            createdAt: loggedInUser.createdAt,
            updatedAt: loggedInUser.updatedAt,
          })
        }
      },
      onError: (err: FetchError) => {
        console.log(err)
      },
    },
  )

  const idDuplicateMutation = useMutation(
    async (params: { userCredential: IdDuplicateCheckRequest; accessToken: string }) => {
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
    async (params: { userCredential: EmailDuplicateCheckRequest; accessToken: string }) => {
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
