import { IdDuplicateCheckResponse } from './../../repositories/user.repository';
import { useMutation } from '@tanstack/react-query'
import { UserCredential, userFactory } from '@/api/models/user.model'
import { useRouter } from 'next/router'
import { queryClient } from '@/api/clients/queryClient'
import { FetchError } from '@/api/clients/utils/fetchError'

export const useMutateUser = () => {
  const router = useRouter()

  const signUpMutation = useMutation(
    async (params: { userCredential: UserCredential; accessToken: string }) => {
      const { userCredential, accessToken } = params;
      return await userFactory().signUp(userCredential, accessToken);
    },
    {
      onSuccess: () => {},
      onError: (err: FetchError) => {
        console.log(err);
      },
    },
  );

  const loginMutation = useMutation(
    async (params:{ userCredential: UserCredential, accessToken: string}) => {
      const { userCredential, accessToken } = params;
      return await userFactory().login(userCredential, accessToken)
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
    async (params: { accessToken: string }) => {
      const { accessToken } = params;
      return await userFactory().logout(accessToken);
    },
    {
      onSuccess: () => {
        queryClient.clear(); // Clear all cache
        router.push('/');
      },
      onError: (err: FetchError) => {
        console.log(err);
      },
    },
  );

  const IdDuplicateMutation = useMutation(
    async (params: { userId: string; accessToken: string }) => {
      const { userId, accessToken } = params;
      return await userFactory().idDuplicateCheck(userId, accessToken);
    },
    {
      onSuccess: () => {},
      onError: (err: FetchError) => {
        console.log(err);
      },
    }
  );
  
  const EmailDuplicateMutation = useMutation(
    async (params: { email: string; accessToken: string }) => {
      const { email, accessToken } = params;
      return await userFactory().emailDuplicateCheck(email, accessToken);
    },
    {
      onSuccess: () => {},
      onError: (err: FetchError) => {
        console.log(err);
      },
    }
  )
  return { signUpMutation, loginMutation, logoutMutation, IdDuplicateMutation, EmailDuplicateMutation }
}
