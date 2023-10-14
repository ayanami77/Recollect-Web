import { formatToDate } from '@/libs/dayjs'

describe('formatToDate', () => {
  test('入力値をYYYY/MM/DDにフォーマットする', () => {
    expect(formatToDate('2023-09-14T03:22:29.108256Z')).toBe('2023/09/14')
  })
})
