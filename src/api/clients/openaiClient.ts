import { OpenAI } from 'openai'

const openaiClient = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
})

export { openaiClient }
