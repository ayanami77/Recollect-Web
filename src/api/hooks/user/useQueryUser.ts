import { FetchError } from '@/api/errors/fetchError'
import { useQuery } from '@tanstack/react-query'
import { User } from '@/api/models/user.model'
import { userFactory } from '@/api/factory/user.factory'
import { getSession } from 'next-auth/react'

export const useQueryUser = () => {
  return useQuery<User, FetchError>(
    ['user'],
    async () => {
      const session = await getSession()
      const accessToken = session?.user.access_token ?? ''
      return userFactory().getUser(accessToken)
    },
    {
      staleTime: Infinity,
      onSuccess: () => {},
      onError: (err: FetchError) => {
        console.log(err)
      },
    },
  )
}
