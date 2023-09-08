import { z } from 'zod'

export const CardValidationSchema = z.object({
  title: z.string().nonempty('タイトルは必須です。').max(20, '最大20文字です。'),
  content: z.string().nonempty('内容は必須です。'),
})
export type TCardValidationSchema = z.infer<typeof CardValidationSchema>
