import { setupWorker } from 'msw'
import { historyHandler } from './handlers/history/handler'

export const worker = setupWorker(...historyHandler)
