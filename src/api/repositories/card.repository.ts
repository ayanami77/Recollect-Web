import { apiClient } from "../clients/apiClient.app"
import { Card } from "../models"

export interface CardRepository {
  listCards: () => Promise<Card[]>,
}

const listCards: CardRepository['listCards'] = async (): Promise<Card[]> => {
  const { data } = await apiClient.get(`/cards`)
  return data
}

export const cardRepository: CardRepository = {
  listCards,
}