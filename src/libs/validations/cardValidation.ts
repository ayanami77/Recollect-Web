import { z } from 'zod'

export const CardValidationSchema = z.object({
  title: z.string().nonempty('タイトルは必須です').max(20, '最大20文字です'),
  content: z.string().max(500, '500文字以内で記述します'),
})
export type TCardValidationSchema = z.infer<typeof CardValidationSchema>
