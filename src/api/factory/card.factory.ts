import { Card, toCard } from '../models/card.model'
import { cardRepository } from '../repositories/card.repository'
import {
  AnalyzeCardRequest,
  CreateCardListRequest,
  CreateCardRequest,
  DeleteCardRequest,
  UpdateCardRequest,
} from '../schemas/types/card.type'

export const cardFactory = () => {
  const repository = cardRepository
  return {
    list: async (accessToken: string): Promise<Card[]> => {
      const data = await repository.listCards(accessToken)
      const cards = data.map((card) => {
        return toCard(card)
      })
      return cards
    },
    post: async (cardData: CreateCardRequest, accessToken: string): Promise<Card> => {
      const data = await repository.createCard(cardData, accessToken)
      const card = toCard(data)
      return card
    },
    batchPost: async (
      cardListData: CreateCardListRequest,
      accessToken: string,
    ): Promise<Card[]> => {
      const data = await repository.createCardList(cardListData, accessToken)
      const cards = data.map((card) => {
        return toCard(card)
      })
      return cards
    },
    update: async (cardData: UpdateCardRequest, accessToken: string): Promise<Card> => {
      const data = await repository.updateCard(cardData, accessToken)
      const card = toCard(data)
      return card
    },
    delete: async (cardData: DeleteCardRequest, accessToken: string) =>
      repository.deleteCard(cardData, accessToken),
    analyze: async (cardData: AnalyzeCardRequest, accessToken: string): Promise<Card> => {
      const data = await repository.analyzeCard(cardData, accessToken)
      const card = toCard(data)
      return card
    },
  }
}
