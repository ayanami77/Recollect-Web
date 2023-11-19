import { Card } from '../models/card.model'
import { apiClient } from '../clients/apiClient'
import { Card as CardResponse } from '../schemas/generated/schemas'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export interface CardRepository {
  listCards: () => Promise<CardResponse[]>
  createCard: (cardData: Pick<Card, 'title' | 'content' | 'period'>) => Promise<CardResponse>
  createCards: (
    cardListData: Pick<Card, 'title' | 'content' | 'period'>[],
  ) => Promise<CardResponse[]>
  updateCard: (cardData: Partial<Card>) => Promise<CardResponse>
  deleteCard: (cardData: Pick<Card, 'id'>) => void
}

const listCards: CardRepository['listCards'] = async (): Promise<CardResponse[]> => {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error('Session is not found')
  }
  const data = await apiClient.get('/cards',{accessToken: session.user.access_token || ""},)
  return data
}

const createCard: CardRepository['createCard'] = async (
  cardData: Pick<Card, 'title' | 'content' | 'period'>,
): Promise<CardResponse> => {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error('Session is not found')
  }
  const data = await apiClient.post('/cards',{accessToken: session.user.access_token || ""}, {
    period: cardData.period,
    title: cardData.title,
    content: cardData.content,
  })
  return data
}

const createCards: CardRepository['createCards'] = async (
  cardData: Pick<Card, 'title' | 'content' | 'period'>[],
): Promise<CardResponse[]> => {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error('Session is not found')
  }
  const data = await apiClient.post(`/cards/batch`,{accessToken: session.user.access_token || ""}, {
    cards: cardData,
  })
  return data
}

const updateCard: CardRepository['updateCard'] = async (
  cardData: Partial<Card>,
): Promise<CardResponse> => {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error('Session is not found')
  }
  const data = await apiClient.patch(`/cards/${cardData.id}`,{accessToken: session.user.access_token || ""},  {
    // cardDataに保持している値を展開してしまう。
    ...cardData,
  })
  return data
}

const deleteCard: CardRepository['deleteCard'] = async (cardData: Pick<Card, 'id'>) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error('Session is not found')
  }
  await apiClient.destroy(`/cards/${cardData.id}`,{accessToken: session.user.access_token || ""}, )
}

export const cardRepository: CardRepository = {
  listCards,
  createCard,
  createCards,
  updateCard,
  deleteCard,
}
