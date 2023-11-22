import { FetchError } from './utils/fetchError'
import { toJSONFormat } from './utils/toJSONFormat'

const baseURL =
  process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
    ? process.env.NEXT_PUBLIC_API_MOCK_ENDPOINT
    : process.env.NEXT_PUBLIC_API_ENDPOINT

const makeRequestBody = <T = object>(body: T) => {
  // bodyがundefined, nullの場合はnullを返す
  if (!body) return null
  return JSON.stringify(toJSONFormat(body))
}

type TMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE'
type THeader = {
  accessToken: string
}

const http = async (path: string, method: TMethod, header: THeader, body?: any) => {
  const res = await fetch(`${baseURL}${path}`, {
    method: method,
    mode: 'cors',
    body: makeRequestBody(body),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${header.accessToken}`,
    },
  })

  if (!res.ok) {
    const data = await res.json()
    const error = new FetchError(data.error, res.status)
    throw error
  }

  // 204 no contentの時、空のオブジェクトを返す
  if (res.status === 204) return {}

  return res.json()
}

const get = async (path: string, header: THeader) => {
  const data = await http(path, 'GET', header)
  return data
}

const post = async (path: string, header: THeader, body?: any) => {
  const data = await http(path, 'POST', header, body)
  return data
}

const patch = async (path: string, header: THeader, body: any) => {
  const data = await http(path, 'PATCH', header, body)
  return data
}

// deleteは予約語なため、destroyをdeleteとみなす(;´･ω･)
const destroy = async (path: string, header: THeader) => {
  const data = await http(path, 'DELETE', header)
  return data
}

export const apiClient = {
  get,
  post,
  patch,
  destroy,
}
