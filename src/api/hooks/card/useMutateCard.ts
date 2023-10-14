import { useMutation } from '@tanstack/react-query'
import { useError } from '../utils/useError'
import { Card, cardFactory } from '@/api/models/card.model'
import { queryClient } from '@/api/clients/queryClient'

export const useMutateCard = () => {
  const { switchErrorHandling } = useError()

  const createCardMutation = useMutation(
    (cardData: Pick<Card, 'title' | 'content' | 'period'>) => cardFactory().post(cardData),
    {
      onSuccess: (res) => {
        const previousCards = queryClient.getQueryData<Card[]>(['cards'])
        if (previousCards) {
          queryClient.setQueryData(['cards'], [...previousCards, res])
        }
      },
      onError: (err: any) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message)
        } else {
          switchErrorHandling(err.response.data)
        }
      },
    },
  )

  const createCardsMutation = useMutation(
    (cardData: Pick<Card, 'title' | 'content' | 'period'>[]) => cardFactory().batchPost(cardData),
    {
      onSuccess: (res) => {
        const previousCards = queryClient.getQueryData<Card[]>(['cards'])
        if (previousCards) {
          queryClient.setQueryData(['cards'], [...previousCards, ...res])
        }
      },
      onError: (err: any) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message)
        } else {
          switchErrorHandling(err.response.data)
        }
      },
    },
  )

  const updateCardMutation = useMutation(
    (cardData: Partial<Card>) => cardFactory().update(cardData),
    {
      onSuccess: (_, variables) => {
        const previousCards = queryClient.getQueryData<Card[]>(['cards'])
        if (previousCards) {
          queryClient.setQueryData<Card[]>(
            ['cards'],
            previousCards.map((card) =>
              card.id === variables.id
                ? {
                    ...card,
                    ...variables,
                  }
                : card,
            ),
          )
        }
      },
      onError: (err: any) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message)
        } else {
          switchErrorHandling(err.response.data)
        }
      },
    },
  )

  const deleteUserMutation = useMutation(
    (cardData: Pick<Card, 'id'>) => cardFactory().delete(cardData),
    {
      onSuccess: (_, variables) => {
        const previousCards = queryClient.getQueryData<Card[]>(['cards'])
        if (previousCards) {
          queryClient.setQueryData(
            ['cards'],
            previousCards.filter((card) => card.id !== variables.id),
          )
        }
      },
      onError: (err: any) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message)
        } else {
          switchErrorHandling(err.response.data)
        }
      },
    },
  )

  return {
    createCardMutation,
    createCardsMutation,
    updateCardMutation,
    deleteUserMutation,
  }
}
