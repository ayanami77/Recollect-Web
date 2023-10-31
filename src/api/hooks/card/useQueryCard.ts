import { FetchError } from '@/api/clients/utils/fetchError'
import { Card, cardFactory } from '../../models/card.model'
import { useQuery } from '@tanstack/react-query'

export const useQueryCards = () => {
  return useQuery<Card[], FetchError>({
    queryKey: ['cards'],
    queryFn: () => cardFactory().list(),
    staleTime: Infinity,
    onSuccess: () => {},
    onError: (err: FetchError) => {
      console.log(err)
    },
  })
}
