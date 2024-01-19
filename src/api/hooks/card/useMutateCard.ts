import { useMutation } from '@tanstack/react-query'
import { Card } from '@/api/models/card.model'
import { queryClient } from '@/api/clients/queryClient'
import { FetchError } from '@/api/errors/fetchError'
import {
  AnalyzeCardRequest,
  CreateCardListRequest,
  CreateCardRequest,
  DeleteCardRequest,
  UpdateCardRequest,
} from '@/api/schemas/types/card.type'
import { cardFactory } from '@/api/factory/card.factory'

export const useMutateCard = () => {
  const createCardMutation = useMutation(
    (params: { cardData: CreateCardRequest; accessToken: string }) => {
      const { cardData, accessToken } = params
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
    (params: { cardData: CreateCardListRequest; accessToken: string }) => {
      const { cardData, accessToken } = params
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
    (params: { cardData: UpdateCardRequest; accessToken: string }) => {
      const { cardData, accessToken } = params
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
    (params: { cardData: DeleteCardRequest; accessToken: string }) => {
      const { cardData, accessToken } = params
      return cardFactory().delete(cardData, accessToken)
    },
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

  const analyzeCardMutation = useMutation(
    (params: { cardData: AnalyzeCardRequest; accessToken: string }) => {
      const { cardData, accessToken } = params
      return cardFactory().analyze(cardData, accessToken)
    },
    {
      onSuccess: (res) => {
        const previousCards = queryClient.getQueryData<Card[]>(['cards'])
        if (previousCards) {
          queryClient.setQueryData<Card[]>(
            ['cards'],
            previousCards.map((card) => (card.id === res.id ? res : card)),
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
    analyzeCardMutation,
  }
}
