import { toPeriodStringFromNumber } from '@/utils/toPeriodStringFromNumber'

describe('toPeriodStringFromNumber', () => {
  test('periodを示す数字を対応する文字列に変換する', () => {
    expect(toPeriodStringFromNumber('0')).toBe('現在まで')
  })
})
