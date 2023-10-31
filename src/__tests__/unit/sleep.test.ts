import { sleep } from '@/api/utils/sleep'

describe('sleep', () => {
  test('指定時間待つと、経過時間をもってresolveされる', async () => {
    expect(await sleep(1000)).toBe(1000)
  })
})
