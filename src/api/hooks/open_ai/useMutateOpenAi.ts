import { useMutation } from '@tanstack/react-query'
import { useError } from '../utils/useError'
import { OpenAICredential, openAiFactory } from '@/api/models/openai.model'

export const useMutateOpenAIResponse = () => {
  const { switchErrorHandling } = useError()
  const openaiResponseMutation = useMutation(
    async (prompt: OpenAICredential) => await openAiFactory().getOpenAIResponse(prompt),
    {
      onSuccess: (res) => {
        console.log(res)
        // TODO: GoのAPIを叩く
        // TODO: mutateCardを実行し、opentaiCommentを更新する
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
