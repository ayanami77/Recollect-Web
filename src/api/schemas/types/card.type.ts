import { Card } from '../generated/schemas'

export type Period = '0' | '1' | '2' | '3' | '4'

export type ListCardsResponse = Card[]

export type CreateCardRequest = {
  period: Period
  title: string
  content: string
}

export type CreateCardResponse = Card

export type CreateCardListRequest = {
  period: Period
  title: string
  content: string
}[]

export type CreateCardListResponse = Card[]

export type UpdateCardRequest = {
  id: string
  period: Period
  title: string
  content: string
}

export type UpdateCardResponse = Card

export type DeleteCardRequest = {
  id: string
}

export type AnalyzeCardRequest = {
  id: string
  period: Period
  title: string
  content: string
}

export type AnalyzeCardResponse = Card
