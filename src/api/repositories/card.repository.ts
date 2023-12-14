import { apiClient } from '../clients/apiClient'
import { Card as CardResponse } from '../schemas/generated/schemas'
import {
  AnalyzeCardRequest,
  AnalyzeCardResponse,
  CreateCardListRequest,
  CreateCardListResponse,
  CreateCardRequest,
  CreateCardResponse,
  DeleteCardRequest,
  ListCardsResponse,
  UpdateCardRequest,
  UpdateCardResponse,
} from '../schemas/types/card.type'

export interface CardRepository {
  listCards: (accessToken: string) => Promise<ListCardsResponse>
  createCard: (cardData: CreateCardRequest, accessToken: string) => Promise<CreateCardResponse>
  createCardList: (
    cardListData: CreateCardListRequest,
    accessToken: string,
  ) => Promise<CreateCardListResponse>
  updateCard: (cardData: UpdateCardRequest, accessToken: string) => Promise<UpdateCardResponse>
  deleteCard: (cardData: DeleteCardRequest, accessToken: string) => void
  analyzeCard: (cardData: AnalyzeCardRequest, accessToken: string) => Promise<AnalyzeCardResponse>
}

const listCards: CardRepository['listCards'] = async (accessToken): Promise<ListCardsResponse> => {
  const data = await apiClient.get('/cards', { accessToken: accessToken || '' })
  return data
}

const createCard: CardRepository['createCard'] = async (
  cardData: CreateCardRequest,
  accessToken,
): Promise<CardResponse> => {
  const data = await apiClient.post(
    '/cards',
    { accessToken: accessToken || '' },
    {
      period: cardData.period,
      title: cardData.title,
      content: cardData.content,
    },
  )
  return data
}

const createCardList: CardRepository['createCardList'] = async (
  cardListData: CreateCardListRequest,
  accessToken,
): Promise<CreateCardListResponse> => {
  const data = await apiClient.post(
    `/cards/batch`,
    { accessToken: accessToken || '' },
    {
      cards: cardListData,
    },
  )
  return data
}

const updateCard: CardRepository['updateCard'] = async (
  cardData: UpdateCardRequest,
  accessToken,
): Promise<UpdateCardResponse> => {
  const data = await apiClient.patch(
    `/cards/${cardData.id}`,
    { accessToken: accessToken || '' },
    {
      title: cardData.title,
      content: cardData.content,
      period: cardData.period,
    },
  )
  return data
}

const deleteCard: CardRepository['deleteCard'] = async (
  deleteCardRequest: DeleteCardRequest,
  accessToken,
) => {
  await apiClient.destroy(`/cards/${deleteCardRequest.id}`, { accessToken: accessToken || '' })
}

const analyzeCard: CardRepository['analyzeCard'] = async (
  cardData: AnalyzeCardRequest,
  accessToken,
): Promise<AnalyzeCardResponse> => {
  const data = await apiClient.patch(
    `/cards/analysis/${cardData.id}`,
    { accessToken: accessToken || '' },
    {
      title: cardData.title,
      content: cardData.content,
      period: cardData.period,
    },
  )
  return data
}

export const cardRepository: CardRepository = {
  listCards,
  createCard,
  createCardList,
  updateCard,
  deleteCard,
  analyzeCard,
}
