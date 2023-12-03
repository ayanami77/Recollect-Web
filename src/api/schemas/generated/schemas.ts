/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Card {
  /** @example "0" */
  card_id: string
  period: '0' | '1' | '2' | '3' | '4'
  /** @example "文系でも化学部が楽しかった話!" */
  title: string
  /** @example "毎週、教科書で出てくるような有名な実験から面白い実験まで色々なことをしていました。etc ..." */
  content?: string
  /** @example ["実験好き","好奇心"] */
  tags?: string[]
  /** @example "- **実験好き**: 文章の中で毎週実験をしていたことや実験を通じてわくわく感を感じていたことから、実験に対する興味や好奇心があることが分かります。 etc ..." */
  analysis_result?: string
  /** @example "2023-09-01T12:14:57.548Z" */
  created_at: string
  /** @example "2023-09-01T12:14:57.548Z" */
  updated_at: string
}

export interface Cards {
  cards: Card[]
}

export interface User {
  /** @example "user8864" */
  user_id: string
  /** @example "reco_user" */
  user_name: string
  /** @example "2023-09-01T12:14:57.548Z" */
  created_at: string
  /** @example "2023-09-01T12:14:57.548Z" */
  updated_at: string
}

export type QueryParamsType = Record<string | number, any>
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat
  /** request body */
  body?: unknown
  /** base url */
  baseUrl?: string
  /** request cancellation token */
  cancelToken?: CancelToken
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void
  customFetch?: typeof fetch
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D
  error: E
}

type CancelToken = Symbol | string | number

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = 'http://localhost:8080'
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
  private abortControllers = new Map<CancelToken, AbortController>()
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams)

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig)
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key)
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key])
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key]
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&')
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {}
    const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key])
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join('&')
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery)
    return queryString ? `?${queryString}` : ''
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string')
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== 'string' ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key]
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        )
        return formData
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  }

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    }
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken)
      if (abortController) {
        return abortController.signal
      }
      return void 0
    }

    const abortController = new AbortController()
    this.abortControllers.set(cancelToken, abortController)
    return abortController.signal
  }

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken)

    if (abortController) {
      abortController.abort()
      this.abortControllers.delete(cancelToken)
    }
  }

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const queryString = query && this.toQueryString(query)
    const payloadFormatter = this.contentFormatters[type || ContentType.Json]
    const responseFormat = format || requestParams.format

    return this.customFetch(
      `${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
        },
        signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
        body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>
      r.data = null as unknown as T
      r.error = null as unknown as E

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data
              } else {
                r.error = data
              }
              return r
            })
            .catch((e) => {
              r.error = e
              return r
            })

      if (cancelToken) {
        this.abortControllers.delete(cancelToken)
      }

      if (!response.ok) throw data
      return data
    })
  }
}

/**
 * @title Recollect API
 * @version 1.0.0
 * @baseUrl http://localhost:8080
 *
 * RecollectのサービスのAPIです。
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  cards = {
    /**
     * No description
     *
     * @tags cards
     * @name CardsList
     * @summary 自分史一覧の取得
     * @request GET:/cards
     */
    cardsList: (params: RequestParams = {}) =>
      this.request<Cards, any>({
        path: `/cards`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags cards
     * @name CardsCreate
     * @summary 自分史の作成
     * @request POST:/cards
     */
    cardsCreate: (
      data: {
        /** @example "高校生" */
        title?: string
        /** @example "高校生" */
        period?: string
        /** @example "毎週、教科書で出てくるような有名な実験から面白い実験まで色々なことをしていました。etc ..." */
        content?: string
      },
      params: RequestParams = {},
    ) =>
      this.request<Card, any>({
        path: `/cards`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags cards
     * @name CardsPartialUpdate
     * @summary 自分史の更新
     * @request PATCH:/cards/{cardId}
     */
    cardsPartialUpdate: (
      cardId: string,
      data: {
        /** @example "高校生" */
        title?: string
        /** @example "高校生" */
        period?: string
        /** @example "毎週、教科書で出てくるような有名な実験から面白い実験まで色々なことをしていました。etc ..." */
        content?: string
      },
      params: RequestParams = {},
    ) =>
      this.request<Card, any>({
        path: `/cards/${cardId}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags cards
     * @name CardsDelete
     * @summary 自分史の削除
     * @request DELETE:/cards/{cardId}
     */
    cardsDelete: (cardId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/cards/${cardId}`,
        method: 'DELETE',
        ...params,
      }),
  }
  users = {
    /**
     * No description
     *
     * @tags users
     * @name LoginCreate
     * @summary ログイン
     * @request POST:/users/login
     */
    loginCreate: (
      data: {
        /** @example "user8864" */
        user_id?: string
        /** @example "password" */
        password?: string
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/users/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name SignupCreate
     * @summary サインアップ
     * @request POST:/users/signup
     */
    signupCreate: (
      data: {
        /** @example "user8864" */
        user_id?: string
        /** @example "password" */
        password?: string
      },
      params: RequestParams = {},
    ) =>
      this.request<User, any>({
        path: `/users/signup`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name LogoutCreate
     * @summary ログアウト
     * @request POST:/users/logout
     */
    logoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/logout`,
        method: 'POST',
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersPartialUpdate
     * @summary ユーザ―情報の更新
     * @request PATCH:/users/{userId}
     */
    usersPartialUpdate: (userId: string, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/${userId}`,
        method: 'PATCH',
        format: 'json',
        ...params,
      }),
  }
}
