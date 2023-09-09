import { useMutation } from '@tanstack/react-query'
import { useError } from '../utils/useError'
import { OpenAICredential, openAiFactory } from '@/api/models/openai.model'
import { useMutateCard } from '../card/useMutateCard'

export const useMutateOpenAIResponse = () => {
  const { switchErrorHandling } = useError()
  const { updateAnalysisResultMutation: updateAnalysisResultMutation } = useMutateCard()
  const openaiResponseMutation = useMutation(
    async (credential: OpenAICredential) => await openAiFactory().getOpenAIResponse(credential),
    {
      onSuccess: (res, variables: OpenAICredential) => {
        // TODO: GoのAPIをたたく
        if (res) {
          updateAnalysisResultMutation.mutate({ id: variables.id, analysisResult: res })
        }
      },
      onError: (err: any) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message)
        } else {
          switchErrorHandling(err.response.data)
        }
      },
    },
  )
  return {
    openaiResponseMutation,
  }
}
