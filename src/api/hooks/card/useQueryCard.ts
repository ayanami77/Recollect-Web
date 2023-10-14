import { Card, cardFactory } from '../../models/card.model'
import { useQuery } from '@tanstack/react-query'
import { useError } from '../utils/useError'

export const useQueryCards = () => {
  const { switchErrorHandling } = useError()

  return useQuery<Card[], Error>({
    queryKey: ['cards'],
    queryFn: () => cardFactory().list(),
    staleTime: Infinity,
    onSuccess: () => {},
    onError: (err: any) => {
      if (err.response.data.message) {
        switchErrorHandling(err.response.data.message)
      } else {
        switchErrorHandling(err.response.data)
      }
    },
  })
}
