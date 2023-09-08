import { openaiRepository } from "../repositories/openai.repository"

export const openAiFactory = () => {
  const repository = openaiRepository
	return {
		getOpenAIResponse: async (): Promise<any> => {
			const response = await repository.getOpenAIResponse()
			return response
		},
	}
}