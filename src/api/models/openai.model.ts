import { openaiRepository } from '../repositories/openai.repository'

export type OpenAICredential = {
  id: number
  prompt: string
}

export const openAiFactory = () => {
  const repository = openaiRepository
  return {
    getOpenAIResponse: async (credential: OpenAICredential): Promise<string | null> => {
      const response = await repository.getOpenAIResponse(credential.prompt)
      return response.choices[0].message.content
    },
  }
}
