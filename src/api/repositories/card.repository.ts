import { apiClient } from '../clients/apiClient.app'
import { Card } from '../models'

export interface CardRepository {
  listCards: () => Promise<Card[]>
  createCard: (cardData: Pick<Card, 'title' | 'content' | 'period'>) => Promise<Card>
  updateCard: (cardData: Pick<Card, 'id' | 'title' | 'content' | 'period'>) => Promise<Card>
  deleteCard: (cardData: Pick<Card, 'id'>) => void
}

const listCards: CardRepository['listCards'] = async (): Promise<Card[]> => {
  const { data } = await apiClient.get(`/cards`)
  return data
}

const createCard = async (cardData: Pick<Card, 'title' | 'content' | 'period'>): Promise<Card> => {
  const { data } = await apiClient.post(`/cards`, {
    period: cardData.period,
    title: cardData.title,
    content: cardData.content,
  })
  return data
}

const updateCard = async (
  cardData: Pick<Card, 'id' | 'title' | 'content' | 'period'>,
): Promise<Card> => {
  const { data } = await apiClient.patch(`/cards/${cardData.id}`, {
    period: cardData.period,
    title: cardData.title,
    content: cardData.content,
  })
  return data
}

const deleteCard: CardRepository['deleteCard'] = async (cardData: Pick<Card, 'id'>) => {
  await apiClient.delete(`/cards/${cardData.id}`)
}

export const cardRepository: CardRepository = {
  listCards,
  createCard,
  updateCard,
  deleteCard,
}
