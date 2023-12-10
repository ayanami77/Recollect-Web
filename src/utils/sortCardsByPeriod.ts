import { Card as TCard } from '@/api/models/card.model'

export const sortCardsByPeriod = (data: TCard[]) => {
  const result: { [key: string]: TCard[] } = {
    '0': [],
    '1': [],
    '2': [],
    '3': [],
    '4': [],
  }
  for (const d of data) result[d.period].push(d)
  return result
}
