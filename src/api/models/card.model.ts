import { cardRepository } from '../repositories'

//TODO: 適宜修正
export type Period = '現在まで' | '高校生' | '中学生' | '小学生' | '幼少期'

export type Card = {
  id: number
  period: Period
  title: string
  content: string
  tags: string[]
  analisisResult: string
  createdAt: string
  updatedAt: string
}

export const cardFactory = () => {
  const repository = cardRepository
  return {
    list: async (): Promise<Card[]> => {
      const response = await repository.listCards()
      return response
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
    updateAnalisisResult: async (cardData: Pick<Card, 'id' | 'analisisResult'>): Promise<Card> => {
      const response = await repository.updateAnalisisResult(cardData)
      return response
    },
  }
}
