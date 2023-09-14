import { cardRepository } from '../repositories'

//TODO: 適宜修正
export type Period = '現在まで' | '高校生' | '中学生' | '小学生' | '幼少期'

export type Card = {
  id: string
  period: Period
  title: string
  content: string
  tags: string[]
  analysisResult: string
  createdAt: string
  updatedAt: string
}

export const cardFactory = () => {
  const repository = cardRepository

  return {
    list: async (): Promise<Card[]> => {
      const response = await repository.listCards()
      const data = response.data.map((card) => {
        return {
          id: card.card_id,
          title: card.title,
          period: card.period,
          content: card.content,
          tags: card.tags ?? [],
          analysisResult: card.analysis_result,
          createdAt: card.created_at,
          updatedAt: card.updated_at,
        }
      })
      return data
    },
    post: async (cardData: Pick<Card, 'title' | 'content' | 'period'>): Promise<Card> => {
      const response = await repository.createCard(cardData)
      return response
    },
    update: async (cardData: Pick<Card, 'id' | 'title' | 'content' | 'period'>): Promise<Card> => {
      const response = await repository.updateCard(cardData)
      return response
    },
    delete: async (cardData: Pick<Card, 'id'>): Promise<void> => {
      repository.deleteCard(cardData)
    },
    updateAnalysisResult: async (
      cardData: Pick<Card, 'id' | 'analysisResult' | 'tags'>,
    ): Promise<Card> => {
      const response = await repository.updateAnalysisResult(cardData)
      return response
    },
  }
}
