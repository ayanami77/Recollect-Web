const baseURL =
  process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
    ? process.env.NEXT_PUBLIC_API_MOCK_ENDPOINT
    : process.env.NEXT_PUBLIC_API_ENDPOINT

const makeRequestBody = <T = object>(body: T) => {
  // bodyがundefined, nullの場合はnullを返す
  if (!body) return null
  return JSON.stringify(body)
}

type TMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE'

const http = async (path: string, method: TMethod, body?: any) => {
  const res = await fetch(`${baseURL}${path}`, {
    method: method,
    mode: 'cors',
    body: makeRequestBody(body),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // TODO: エラーハンドリングをAPI定義後に考える
  if (!res.ok) {
    // const error = new FetchError("エラーが発生しました", { status: res.status })
    // const data = await res.json();
    // error.message = data.message
    // throw error
  }

  // 204 no contentの時、空のオブジェクトを返す
  if (res.status === 204) return {}

  return res.json()
}

const get = async (path: string) => {
  const data = await http(path, 'GET')
  return data
}

const post = async (path: string, body?: any) => {
  const data = await http(path, 'POST', body)
  return data
}

const patch = async (path: string, body: any) => {
  const data = await http(path, 'PATCH', body)
  return data
}

// deleteは予約語なため、destroyをdeleteとみなす(;´･ω･)
const destroy = async (path: string) => {
  const data = await http(path, 'DELETE')
  return data
}

export const apiClient = {
  get,
  post,
  patch,
  destroy,
}
