import { useMutation } from '@tanstack/react-query'
import { OpenAICredential, openaiFactory } from '@/api/models/openai.model'
import { useMutateCard } from '../card/useMutateCard'
import { FetchError } from '@/api/clients/utils/fetchError'

export const useMutateOpenAIResponse = () => {
  const { updateCardMutation } = useMutateCard()
  const openaiResponseMutation = useMutation(
    async (credential: OpenAICredential) => await openaiFactory().getOpenAIResponse(credential),
    {
      onSuccess: (res, variables: OpenAICredential) => {
        if (res) {
          updateCardMutation.mutate({
            id: variables.id,
            analysisResult: res.analysisResult,
            tags: res.tags,
          })
        }
      },
      onError: (err: FetchError) => {
        console.log(err)
      },
    },
  )
  return {
    openaiResponseMutation,
  }
}
