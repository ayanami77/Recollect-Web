import { UserCredential } from '@/api/models/user.model'
import { rest } from 'msw'

const now = new Date()

export const userHandler = [
  rest.post<UserCredential, any>('/users/login', async (req, res, ctx) => {
    const { user_id, password } = await req.json()
    console.log({ user_id, password })
    return res(ctx.status(204), ctx.cookie('mock_user_token', 'fake_token'))
  }),

  rest.post<UserCredential, any>('/users/signup', async (req, res, ctx) => {
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

  rest.post<UserCredential, any>('/users/logout', async (req, res, ctx) => {
    return res(ctx.status(204), ctx.cookie('mock_user_token', ''))
  }),

  rest.post<UserCredential, any>('/users/id_duplicate_check', async (req, res, ctx) => {
    const { userId } = await req.json()
    console.log({ userId })
    return res(ctx.json({ isDuplicate: false }))
  }),

  rest.post<UserCredential, any>('/users/email_duplicate_check', async (req, res, ctx) => {
    const { email } = await req.json()
    console.log({ email })
    return res(ctx.json({ isDuplicate: false }))
  }),
]
