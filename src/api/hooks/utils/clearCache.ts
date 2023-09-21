import { queryClient } from '@/api/clients/queryClient'

export const clearCache = () => {
  queryClient.clear() // 全てのcacheを削除する。
}
