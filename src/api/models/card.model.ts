import { Card as CardResponse } from '../schemas/generated/schemas'

export type Period = '0' | '1' | '2' | '3' | '4'
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

export const toCard = (card: CardResponse): Card => {
  return {
    id: card.card_id,
    title: card.title,
    period: card.period,
    content: card.content ? card.content : '',
    tags: card.tags ?? [],
    analysisResult: card.analysis_result ? card.analysis_result : '',
    createdAt: card.created_at,
    updatedAt: card.updated_at,
  }
}
