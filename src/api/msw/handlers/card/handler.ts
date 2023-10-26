import { rest } from 'msw'
import { mockData } from './data'
import { v4 as uuid } from 'uuid'
import { Card as CardResponse } from '@/api/schemas/generated/schemas'
import { Card } from '@/api/models/card.model'

// TODO: 型アサーションだめ、ぜったい
const now = new Date() as unknown as string

export const cardHandler = [
  rest.get('/cards', (req, res, ctx) => {
    return res(ctx.json<CardResponse[]>(mockData))
  }),

  rest.post<Pick<Card, 'title' | 'content' | 'period'>, any>('/cards', async (req, res, ctx) => {
    const { content, title, period } = await req.json()

    const newCard = {
      card_id: uuid(),
      title: title,
      content: content,
      period: period,
      analysis_result: '',
      tags: [],
      created_at: now,
      updated_at: now,
      deleted_at: '',
      user_id: '',
    }

    mockData.push(newCard)

    return res(
      ctx.json<CardResponse>(newCard),
      // ctx.status(500),
      // ctx.json({
      //   "error": "internal server error"
      // })
    )
  }),

  rest.patch<Pick<Card, 'title' | 'content' | 'period'>, any>(
    '/cards/:cardId',
    async (req, res, ctx) => {
      const { content, title, period } = await req.json()
      const { cardId } = req.params
      const targetIndex = mockData.findIndex((d) => d.card_id === cardId)

      const updatedCard = {
        card_id: mockData[targetIndex].card_id,
        title: title,
        content: content,
        period: period,
        analysis_result: mockData[targetIndex].analysis_result,
        tags: mockData[targetIndex].tags,
        created_at: mockData[targetIndex].created_at,
        updated_at: mockData[targetIndex].updated_at,
      }

      if (targetIndex > -1) mockData.splice(targetIndex, 1)
      mockData.push(updatedCard)

      return res(ctx.json<CardResponse>(updatedCard))
    },
  ),

  rest.delete('/cards/:cardId', async (req, res, ctx) => {
    const { cardId } = req.params

    const targetIndex = mockData.findIndex((d) => d.card_id === cardId)
    if (targetIndex > -1) mockData.splice(targetIndex, 1)

    return res(ctx.status(204))
  }),
]
