import { FetchError } from '@/api/errors/fetchError'
import { Card } from '../../models/card.model'
import { useQuery } from '@tanstack/react-query'
import { cardFactory } from '@/api/factory/card.factory'
import { getSession } from 'next-auth/react'

export const useQueryCards = () => {
  return useQuery<Card[], FetchError>(
    ['cards'],
    async () => {
      const session = await getSession()
      const accessToken = session?.user.access_token ?? ''
      return cardFactory().list(accessToken)
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
