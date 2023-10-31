import { Card } from '../models/card.model'
import { apiClient } from '../clients/apiClient'
import { Card as CardResponse } from '../schemas/generated/schemas'

export interface CardRepository {
  listCards: () => Promise<CardResponse[]>
  createCard: (cardData: Pick<Card, 'title' | 'content' | 'period'>) => Promise<CardResponse>
  createCards: (
    cardListData: Pick<Card, 'title' | 'content' | 'period'>[],
  ) => Promise<CardResponse[]>
  updateCard: (cardData: Partial<Card>) => Promise<CardResponse>
  deleteCard: (cardData: Pick<Card, 'id'>) => void
}

const listCards: CardRepository['listCards'] = async (): Promise<CardResponse[]> => {
  const data = await apiClient.get('/cards')
  return data
}

const createCard: CardRepository['createCard'] = async (
  cardData: Pick<Card, 'title' | 'content' | 'period'>,
): Promise<CardResponse> => {
  const data = await apiClient.post('/cards', {
    period: cardData.period,
    title: cardData.title,
    content: cardData.content,
  })
  return data
}

const createCards: CardRepository['createCards'] = async (
  cardData: Pick<Card, 'title' | 'content' | 'period'>[],
): Promise<CardResponse[]> => {
  const data = await apiClient.post(`/cards/batch`, {
    cards: cardData,
  })
  return data
}

const updateCard: CardRepository['updateCard'] = async (
  cardData: Partial<Card>,
): Promise<CardResponse> => {
  const data = await apiClient.patch(`/cards/${cardData.id}`, {
    // cardDataに保持している値を展開してしまう。
    ...cardData,
  })
  return data
}

const deleteCard: CardRepository['deleteCard'] = async (cardData: Pick<Card, 'id'>) => {
  await apiClient.destroy(`/cards/${cardData.id}`)
}

export const cardRepository: CardRepository = {
  listCards,
  createCard,
  createCards,
  updateCard,
  deleteCard,
}
