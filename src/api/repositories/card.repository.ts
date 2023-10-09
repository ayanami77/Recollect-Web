import { Card, Period } from '../models/card.model'
import { apiClient } from '../clients/apiClient'

// TODO
export type CardResponse = {
  analysis_result: string
  card_id: string
  content: string
  created_at: string
  deleted_at: string
  period: Period
  tags: string[] | null
  title: string
  updated_at: string
  user_id: string
}

export interface CardRepository {
  listCards: () => Promise<{ data: CardResponse[] }>
  createCard: (
    cardData: Pick<Card, 'title' | 'content' | 'period'>,
  ) => Promise<{ data: CardResponse }>
  createCards: (
    cardListData: Pick<Card, 'title' | 'content' | 'period'>[],
  ) => Promise<{ data: CardResponse[] }>
  updateCard: (cardData: Partial<Card>) => Promise<{ data: CardResponse }>
  deleteCard: (cardData: Pick<Card, 'id'>) => void
}

const listCards: CardRepository['listCards'] = async (): Promise<{ data: CardResponse[] }> => {
  const data = await apiClient.get('/cards')
  return data
}

const createCard = async (
  cardData: Pick<Card, 'title' | 'content' | 'period'>,
): Promise<{ data: CardResponse }> => {
  const data = await apiClient.post('/cards', {
    period: cardData.period,
    title: cardData.title,
    content: cardData.content,
  })
  return data
}

const createCards = async (
  cardData: Pick<Card, 'title' | 'content' | 'period'>[],
): Promise<{ data: CardResponse[] }> => {
  const data = await apiClient.post(`/cards/batch`, {
    cards: cardData,
  })
  return data
}

const updateCard = async (cardData: Partial<Card>): Promise<{ data: CardResponse }> => {
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
