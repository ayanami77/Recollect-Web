import { useMutation } from '@tanstack/react-query'
import { useError } from '../utils/useError'
import { OpenAICredential, openaiFactory } from '@/api/models/openai.model'
import { useMutateCard } from '../card/useMutateCard'
import { generateTagsFromAnalysisResult } from '@/utils/generateTagsFromAnalysisResults'

export const useMutateOpenAIResponse = () => {
  const { switchErrorHandling } = useError()
  const { updateCardMutation } = useMutateCard()
  const openaiResponseMutation = useMutation(
    async (credential: OpenAICredential) => await openaiFactory().getOpenAIResponse(credential),
    {
      onSuccess: (res, variables: OpenAICredential) => {
        if (res) {
          const newTags = generateTagsFromAnalysisResult(res)
          updateCardMutation.mutate({
            id: variables.id,
            analysisResult: res,
            tags: newTags,
          })
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
