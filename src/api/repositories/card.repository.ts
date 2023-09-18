import { apiClient } from '../clients/apiClient'
import { Card, Period } from '../models'

// TODO
type CardResponse = {
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
  updateCard: (
    cardData: Pick<Card, 'id' | 'title' | 'content' | 'period'>,
  ) => Promise<{ data: CardResponse }>
  updateAnalysisResult: (
    cardData: Pick<Card, 'id' | 'analysisResult' | 'tags'>,
  ) => Promise<{ data: CardResponse }>
  deleteCard: (cardData: Pick<Card, 'id'>) => void
}

const listCards: CardRepository['listCards'] = async (): Promise<{ data: CardResponse[] }> => {
  const { data } = await apiClient.get(`/card/list`, {
    withCredentials: true,
  })
  return data
}

const createCard = async (
  cardData: Pick<Card, 'title' | 'content' | 'period'>,
): Promise<{ data: CardResponse }> => {
  const { data } = await apiClient.post(
    `/card/new`,
    {
      period: cardData.period,
      title: cardData.title,
      content: cardData.content,
    },
    {
      withCredentials: true,
    },
  )
  return data
}

const updateCard = async (
  cardData: Pick<Card, 'id' | 'title' | 'content' | 'period'>,
): Promise<{ data: CardResponse }> => {
  const { data } = await apiClient.patch(
    `/card/${cardData.id}`,
    {
      period: cardData.period,
      title: cardData.title,
      content: cardData.content,
    },
    {
      withCredentials: true,
    },
  )
  return data
}

const updateAnalysisResult = async (
  cardData: Pick<Card, 'id' | 'analysisResult' | 'tags'>,
): Promise<{ data: CardResponse }> => {
  const { data } = await apiClient.patch(
    `/card/${cardData.id}`,
    {
      analysisResult: cardData.analysisResult,
      tags: cardData.tags,
    },
    {
      withCredentials: true,
    },
  )
  return data
}

const deleteCard: CardRepository['deleteCard'] = async (cardData: Pick<Card, 'id'>) => {
  await apiClient.delete(`/card/${cardData.id}`)
}

export const cardRepository: CardRepository = {
  listCards,
  createCard,
  updateCard,
  updateAnalysisResult,
  deleteCard,
}
