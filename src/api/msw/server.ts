import { setupServer } from 'msw/node'
import { cardHandler } from './handlers/card/handler'

export const server = setupServer(...cardHandler)
