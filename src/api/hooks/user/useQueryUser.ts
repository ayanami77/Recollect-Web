import { FetchError } from '@/api/errors/fetchError'
import { useQuery } from '@tanstack/react-query'
import { User } from '@/api/models/user.model'
import { userFactory } from '@/api/factory/user.factory'

export const useQueryUser = (accessToken: string) => {
  return useQuery<User, FetchError>(['user'], () => userFactory().getUser(accessToken), {
    staleTime: Infinity,
    onSuccess: () => {},
    onError: (err: FetchError) => {
      console.log(err)
    },
  })
}
