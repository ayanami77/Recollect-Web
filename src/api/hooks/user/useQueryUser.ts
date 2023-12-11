import { FetchError } from '@/api/clients/utils/fetchError'
import { useQuery } from '@tanstack/react-query'
import { User, userFactory } from '@/api/models/user.model'

export const useQueryUser = (accessToken: string) => {
  return useQuery<User, FetchError>(['user'], () => userFactory().getUser(accessToken), {
    staleTime: Infinity,
    onSuccess: () => {},
    onError: (err: FetchError) => {
      console.log(err)
    },
  })
}
