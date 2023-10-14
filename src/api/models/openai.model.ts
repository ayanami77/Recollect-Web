import { openaiRepository } from '../repositories/openai.repository'

export type OpenAICredential = {
  id: string
  prompt: string
}

export const openaiFactory = () => {
  const repository = openaiRepository
  return {
    getOpenAIResponse: async (credential: OpenAICredential): Promise<string> => {
      const response = await repository.getOpenAIResponse(credential.prompt)
      const content = response.choices[0].message.content
      if (!content) return ''
      return content
    },
  }
}
