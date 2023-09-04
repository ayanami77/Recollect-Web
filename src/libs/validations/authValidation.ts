import { z } from 'zod'

export const AuthValidationSchema = z.object({
  userId: z
    .string()
    .nonempty('ユーザーIDは必須です。')
    .regex(/^[a-zA-Z0-9]+$/, { message: '半角英数字で入力してください' })
    .min(3, '3文字以上20文字以下で入力してください。')
    .max(20, '3文字以上20文字以下で入力してください。'),
  password: z.string().nonempty('パスワードは必須です。').min(6, '6文字以上で入力してください。'),
})
export type AuthValidationSchemaType = z.infer<typeof AuthValidationSchema>
