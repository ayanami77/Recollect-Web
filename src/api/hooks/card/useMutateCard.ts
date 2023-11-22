import { useMutation } from '@tanstack/react-query'
import { Card, cardFactory } from '@/api/models/card.model'
import { queryClient } from '@/api/clients/queryClient'
import { FetchError } from '@/api/clients/utils/fetchError'

export const useMutateCard = () => {
  const createCardMutation = useMutation(
    (prams:{cardData: Pick<Card, 'title' | 'content' | 'period'>, accessToken: string}) => {
      const {cardData, accessToken} = prams
      return cardFactory().post(cardData, accessToken)
    },
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
    (params: {cardData: Pick<Card, 'title' | 'content' | 'period'>[], accessToken: string}) => {
      const {cardData, accessToken} = params
      return cardFactory().batchPost(cardData, accessToken)
    },
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
    (params: {cardData: Partial<Card>, accessToken: string}) => {
      const {cardData, accessToken} = params
      return cardFactory().update(cardData, accessToken)
    },
    {
      onSuccess: (_, variables) => {
        const previousCards = queryClient.getQueryData<Card[]>(['cards'])
        if (previousCards) {
          queryClient.setQueryData<Card[]>(
            ['cards'],
            previousCards.map((card) =>
              card.id === variables.cardData.id
                ? {
                    ...card,
                    ...variables.cardData,
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
    (params: {
      cardData: Pick<Card, 'id'>
      accessToken: string
    }) =>{
      const {cardData, accessToken} = params
      return cardFactory().delete(cardData, accessToken)},
    {
      onSuccess: (_, variables) => {
        const previousCards = queryClient.getQueryData<Card[]>(['cards'])
        if (previousCards) {
          queryClient.setQueryData(
            ['cards'],
            previousCards.filter((card) => card.id !== variables.cardData.id),
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
