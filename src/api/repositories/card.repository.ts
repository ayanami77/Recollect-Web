import { Card } from '../models/card.model'
import { apiClient } from '../clients/apiClient'
import { Card as CardResponse } from '../schemas/generated/schemas'

export interface CardRepository {
  listCards: (accessToken: string) => Promise<CardResponse[]>
  createCard: (
    cardData: Pick<Card, 'title' | 'content' | 'period'>,
    accessToken: string,
  ) => Promise<CardResponse>
  createCards: (
    cardListData: Pick<Card, 'title' | 'content' | 'period'>[],
    accessToken: string,
  ) => Promise<CardResponse[]>
  updateCard: (cardData: Partial<Card>, accessToken: string) => Promise<CardResponse>
  deleteCard: (cardData: Pick<Card, 'id'>, accessToken: string) => void
}

const listCards: CardRepository['listCards'] = async (accessToken): Promise<CardResponse[]> => {
  const data = await apiClient.get('/cards', { accessToken: accessToken || '' })
  return data
}

const createCard: CardRepository['createCard'] = async (
  cardData: Pick<Card, 'title' | 'content' | 'period'>,
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

const createCards: CardRepository['createCards'] = async (
  cardData: Pick<Card, 'title' | 'content' | 'period'>[],
  accessToken,
): Promise<CardResponse[]> => {
  const data = await apiClient.post(
    `/cards/batch`,
    { accessToken: accessToken || '' },
    {
      cards: cardData,
    },
  )
  return data
}

const updateCard: CardRepository['updateCard'] = async (
  cardData: Partial<Card>,
  accessToken,
): Promise<CardResponse> => {
  const data = await apiClient.patch(
    `/cards/${cardData.id}`,
    { accessToken: accessToken || '' },
    {
      // cardDataに保持している値を展開してしまう。
      ...cardData,
    },
  )
  return data
}

const deleteCard: CardRepository['deleteCard'] = async (
  cardData: Pick<Card, 'id'>,
  accessToken,
) => {
  await apiClient.destroy(`/cards/${cardData.id}`, { accessToken: accessToken || '' })
}

export const cardRepository: CardRepository = {
  listCards,
  createCard,
  createCards,
  updateCard,
  deleteCard,
}
