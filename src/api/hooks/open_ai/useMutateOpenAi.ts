import { openaiRepository } from "@/api/repositories/openai.repository"
import { useMutation } from "@tanstack/react-query"

export const useMutateOpenAIResponse = () => {
	const openaiResponseMutation = useMutation(
		async () => await openaiRepository.getOpenAIResponse(),
		{
			onSuccess: (res) => {
				debugger;
				console.log(res)
			},
			onError: (err: any) => {
				if (err.response.data.message) {
					// switchErrorHandling(err.response.data.message)
				} else {
					// switchErrorHandling(err.response.data)
				}
				console.log(err)
			},
		},
	)
	return {
		openaiResponseMutation,
	}
}