import { apiClient } from '../clients/apiClient.app'
import { Card } from '../models'

export interface CardRepository {
  listCards: () => Promise<Card[]>
  createCard: (cardData: Pick<Card, 'title' | 'content' | 'period'>) => Promise<Card>
  updateCard: (cardData: Pick<Card, 'id' | 'title' | 'content' | 'period'>) => Promise<Card>
  deleteCard: (cardData: Pick<Card, 'id'>) => void
  updateAnalysisResult: (cardData: Pick<Card, 'id' | 'analysisResult' | 'tags'>) => Promise<Card>
}

const listCards: CardRepository['listCards'] = async (): Promise<Card[]> => {
  const { data } = await apiClient.get(`/card`)
  return data
}

const createCard = async (cardData: Pick<Card, 'title' | 'content' | 'period'>): Promise<Card> => {
  const { data } = await apiClient.post(`/card`, {
    period: cardData.period,
    title: cardData.title,
    content: cardData.content,
  })
  return data
}

const updateCard = async (
  cardData: Pick<Card, 'id' | 'title' | 'content' | 'period'>,
): Promise<Card> => {
  const { data } = await apiClient.patch(`/card/${cardData.id}`, {
    period: cardData.period,
    title: cardData.title,
    content: cardData.content,
  })
  return data
}

const deleteCard: CardRepository['deleteCard'] = async (cardData: Pick<Card, 'id'>) => {
  await apiClient.delete(`/card/${cardData.id}`)
}

const updateAnalysisResult = async (
  cardData: Pick<Card, 'id' | 'analysisResult' | 'tags'>,
): Promise<Card> => {
  const { data } = await apiClient.patch(`/card/${cardData.id}`, {
    analysisResult: cardData.analysisResult,
    tags: cardData.tags,
  })
  return data
}

export const cardRepository: CardRepository = {
  listCards,
  createCard,
  updateCard,
  deleteCard,
  updateAnalysisResult,
}
