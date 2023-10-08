import { paths } from '../generated/schemas'
import { UnionToIntersection, Get } from 'type-fest'

export type TUrlPaths = keyof paths

export type THttpMethods = keyof UnionToIntersection<paths[keyof paths]>

// export type TStatusCodes = keyof UnionToIntersection<paths[TUrlPaths][THttpMethods]>

export type TRequest<Path extends TUrlPaths, Method extends THttpMethods> = Get<
  paths,
  `${Path}.${Method}.requestBody.content.application/json`
>

export type TResponse<
  Path extends TUrlPaths,
  Method extends THttpMethods,
  // StatusCode extends TStatusCodes
> = Get<paths, `${Path}.${Method}.responses.200.content.application/json`>
