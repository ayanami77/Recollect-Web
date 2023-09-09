import { ChatCompletion } from 'openai/resources/chat/index.mjs'
import { openai } from '../clients/openaiClient'
import { OpenAICredential } from '../models/openai.model'

export interface OpenAIRepository {
  getOpenAIResponse: (prompt: OpenAICredential['prompt']) => Promise<ChatCompletion>
}

const getOpenAIResponse = async (prompt: OpenAICredential['prompt']) => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-3.5-turbo',
  })
  return completion
}

export const openaiRepository: OpenAIRepository = {
  getOpenAIResponse,
}
