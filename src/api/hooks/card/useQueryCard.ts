import { FetchError } from '@/api/clients/utils/fetchError'
import { Card, cardFactory } from '../../models/card.model'
import { useQuery } from '@tanstack/react-query'

export const useQueryCards = (accessToken: string) => {
  return useQuery<Card[], FetchError>(
    ['cards'],
    () => cardFactory().list(accessToken),
    {
      staleTime: Infinity,
      onSuccess: () => {},
      onError: (err: FetchError) => {
        console.log(err)
      },
    }
  )
}