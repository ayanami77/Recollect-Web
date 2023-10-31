import { useMutation } from '@tanstack/react-query'
import { Card, cardFactory } from '@/api/models/card.model'
import { queryClient } from '@/api/clients/queryClient'
import { FetchError } from '@/api/clients/utils/fetchError'

export const useMutateCard = () => {
  const createCardMutation = useMutation(
    (cardData: Pick<Card, 'title' | 'content' | 'period'>) => cardFactory().post(cardData),
    {
      onSuccess: (res) => {
        const previousCards = queryClient.getQueryData<Card[]>(['cards'])
        if (previousCards) {
          queryClient.setQueryData(['cards'], [...previousCards, res])
        }
      },
      onError: (err: FetchError) => {
        console.log(err)
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
      onError: (err: FetchError) => {
        console.log(err)
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
      onError: (err: FetchError) => {
        console.log(err)
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
      onError: (err: FetchError) => {
        console.log(err)
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
