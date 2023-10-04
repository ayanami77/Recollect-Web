import { setupServer } from 'msw/node'
import { historyHandler } from './handlers/history/handler'

export const server = setupServer(...historyHandler)
