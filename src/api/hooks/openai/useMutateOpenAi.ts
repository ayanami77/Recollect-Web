import { useMutation } from '@tanstack/react-query'
import { OpenAICredential, openaiFactory } from '@/api/models/openai.model'
import { useMutateCard } from '../card/useMutateCard'
import { FetchError } from '@/api/clients/utils/fetchError'

export const useMutateOpenAIResponse = () => {
  const { updateCardMutation } = useMutateCard()
  const openaiResponseMutation = useMutation(
    async (params: { credential: OpenAICredential; accessToken: string }) =>
      await openaiFactory().getOpenAIResponse(params.credential),
    {
      onSuccess: (res, variables: { credential: OpenAICredential; accessToken: string }) => {
        if (res) {
          updateCardMutation.mutate({
            cardData: {
              id: variables.credential.id,
              analysisResult: res.analysisResult,
              tags: res.tags,
            },
            accessToken: variables.accessToken,
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
