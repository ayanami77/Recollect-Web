import { FetchError } from '@/api/errors/fetchError'
import { Card } from '../../models/card.model'
import { useQuery } from '@tanstack/react-query'
import { cardFactory } from '@/api/factory/card.factory'

export const useQueryCards = (accessToken: string) => {
  return useQuery<Card[], FetchError>(['cards'], () => cardFactory().list(accessToken), {
    staleTime: Infinity,
    onSuccess: () => {},
    onError: (err: FetchError) => {
      console.log(err)
    },
  })
}
