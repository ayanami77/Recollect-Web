import { Card, cardFactory } from '../../models'
import { useQuery } from '@tanstack/react-query'
import { useError } from '../utils/useError'


export const useQueryCard = () => {
  const { switchErrorHandling } = useError()

  const listCardsQuery = useQuery<Card[], Error>({
    queryKey: ['cards'],
    queryFn: () => cardFactory().list(),
    staleTime: Infinity,
    onSuccess: () => console.log(`fetch success`),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      if (err.response.data.message) {
        switchErrorHandling(err.response.data.message)
      } else {
        switchErrorHandling(err.response.data)
      }
    },
  })

  return {
    listCardsQuery
  }
}