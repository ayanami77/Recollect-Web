import { setupWorker } from 'msw'
import { cardHandler } from './handlers/card/handler'
import { userHandler } from './handlers/user/handler'

export const worker = setupWorker(...cardHandler, ...userHandler)
