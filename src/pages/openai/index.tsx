import { useMutateOpenAIResponse } from "@/api/hooks/open_ai/useMutateOpenAi"

export default function OpenAi() {
	const { openaiResponseMutation } = useMutateOpenAIResponse()
	
	const onSubmitOpenAi = () => {
		openaiResponseMutation.mutate()
	}

	return (
		<>
			<div>
				<button onClick={onSubmitOpenAi}>OpenAi</button>
			</div>
		</>
	)

}