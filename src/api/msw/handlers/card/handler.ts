import { rest } from 'msw'
import { mockData } from './data'
import { v4 as uuid } from 'uuid'

export type Period = '現在まで' | '高校生' | '中学生' | '小学生' | '幼少期'
type CardResponse = {
  analysis_result: string
  card_id: string
  content: string
  created_at: string
  deleted_at: string
  period: Period
  tags: string[] | null
  title: string
  updated_at: string
  user_id: string
}

type ReqBody = {
  title: string
  content: string
  period: Period
}

// TODO: 型アサーションだめ、ぜったい
const now = new Date() as unknown as string

export const cardHandler = [
  rest.get('/cards', (req, res, ctx) => {
    return res(
      ctx.json<{ data: CardResponse[] }>({
        data: mockData,
      }),
    )
  }),

  rest.post<ReqBody, any>('/cards', async (req, res, ctx) => {
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
      ctx.json<{ data: CardResponse }>({
        data: newCard,
      }),
    )
  }),

  rest.patch('/cards/:cardId', async (req, res, ctx) => {
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
      deleted_at: mockData[targetIndex].deleted_at,
      user_id: mockData[targetIndex].user_id,
    }

    if (targetIndex > -1) mockData.splice(targetIndex, 1)
    mockData.push(updatedCard)

    return res(
      ctx.json<{ data: CardResponse }>({
        data: updatedCard,
      }),
    )
  }),

  // TODO: またanalysisのpatchのところは後ほど

  rest.delete('/cards/:cardId', async (req, res, ctx) => {
    const { cardId } = req.params

    const targetIndex = mockData.findIndex((d) => d.card_id === cardId)
    if (targetIndex > -1) mockData.splice(targetIndex, 1)

    return res(ctx.status(204))
  }),
]
