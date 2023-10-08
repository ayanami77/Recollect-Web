import { rest } from 'msw'

type ReqBody = {
  user_id: string
  password: string
}

const now = new Date() as unknown as string

export const userHandler = [
  rest.post<ReqBody, any>('/users/login', async (req, res, ctx) => {
    const { user_id, password } = await req.json()
    console.log({ user_id, password })
    return res(ctx.status(204), ctx.cookie('mock_user_token', 'fake_token'))
  }),

  rest.post<ReqBody, any>('/users/signup', async (req, res, ctx) => {
    const { user_id, password } = await req.json()
    console.log({ user_id, password })
    return res(
      ctx.json({
        user_id: user_id,
        password: password,
        created_at: now,
        updated_at: now,
      }),
    )
  }),

  rest.post<ReqBody, any>('/users/logout', async (req, res, ctx) => {
    return res(ctx.status(204), ctx.cookie('mock_user_token', ''))
  }),
]
