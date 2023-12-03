import { generateTagsFromAnalysisResult } from '@/utils/generateTagsFromAnalysisResults'
import { openaiRepository } from '../repositories/openai.repository'

export type OpenAIResponse = {
  analysisResult: string
  tags: string[]
}

export type OpenAICredential = {
  id: string
  prompt: string
}

export const openaiFactory = () => {
  const repository = openaiRepository
  return {
    getOpenAIResponse: async (credential: OpenAICredential): Promise<OpenAIResponse> => {
      const response = await repository.getOpenAIResponse(credential.prompt)
      const analysisResult = response.choices[0].message.content
      if (!analysisResult)
        return {
          analysisResult: '',
          tags: [],
        }
      const openAIResponse = {
        analysisResult,
        tags: generateTagsFromAnalysisResult(analysisResult),
      }
      return openAIResponse
    },
  }
}
