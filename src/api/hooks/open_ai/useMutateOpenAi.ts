import { useMutation } from '@tanstack/react-query'
import { useError } from '../utils/useError'
import { OpenAICredential, openAiFactory } from '@/api/models/openai.model'
import { useMutateCard } from '../card/useMutateCard'

export const useMutateOpenAIResponse = () => {
  const { switchErrorHandling } = useError()
  const { updateAnalisisResultMutation } = useMutateCard()
  const openaiResponseMutation = useMutation(
    async (credential: OpenAICredential) => await openAiFactory().getOpenAIResponse(credential),
    {
      onSuccess: (res, variables: OpenAICredential) => {
        console.log(res, variables.id)
        // TODO: GoのAPIをたたく
        if (res) {
          updateAnalisisResultMutation.mutate({ id: variables.id, analisisResult: res })
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
