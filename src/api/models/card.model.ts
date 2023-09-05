import { cardRepository } from '../repositories'

//TODO: 適宜修正
export type Card = {
  id: number
  title: string
  content: string
  tags: string[]
  createdAt: Date | string
  updatedAt: Date | string
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
