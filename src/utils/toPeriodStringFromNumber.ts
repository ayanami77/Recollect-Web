import { match } from 'ts-pattern'
import { Period as TPeriod } from '@/api/models/card.model'

export const toPeriodStringFromNumber = (period: TPeriod) => {
  return match(period)
    .with('0', () => '現在まで')
    .with('1', () => '高校生')
    .with('2', () => '中学生')
    .with('3', () => '小学生')
    .with('4', () => '幼少期')
    .exhaustive()
}
