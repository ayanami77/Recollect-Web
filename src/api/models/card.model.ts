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
      const { data } = await repository.listCards()
      const cards = data.map((card) => {
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
      return cards
    },
    post: async (cardData: Pick<Card, 'title' | 'content' | 'period'>): Promise<Card> => {
      const { data } = await repository.createCard(cardData)
      const card = {
        id: data.card_id,
        title: data.title,
        period: data.period,
        content: data.content,
        tags: data.tags ?? [],
        analysisResult: data.analysis_result,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      }
      return card
    },
    update: async (cardData: Pick<Card, 'id' | 'title' | 'content' | 'period'>): Promise<Card> => {
      const { data } = await repository.updateCard(cardData)
      const card = {
        id: data.card_id,
        title: data.title,
        period: data.period,
        content: data.content,
        tags: data.tags ?? [],
        analysisResult: data.analysis_result,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      }
      return card
    },
    delete: async (cardData: Pick<Card, 'id'>): Promise<void> => {
      repository.deleteCard(cardData)
    },
    updateAnalysisResult: async (
      cardData: Pick<Card, 'id' | 'analysisResult' | 'tags'>,
    ): Promise<Card> => {
      const { data } = await repository.updateAnalysisResult(cardData)
      const card = {
        id: data.card_id,
        title: data.title,
        period: data.period,
        content: data.content,
        tags: data.tags ?? [],
        analysisResult: data.analysis_result,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      }
      return card
    },
  }
}
