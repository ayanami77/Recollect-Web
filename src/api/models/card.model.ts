import { cardRepository } from '../repositories'

//TODO: 適宜修正
type Period = '現在まで' | '高校生' | '中学生' | '小学生' | '幼少期'

export type Card = {
  id: number
  period: Period
  title: string
  content: string
  tags: string[]
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
  }
}
