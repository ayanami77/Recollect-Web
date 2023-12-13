import { toArrayFromStringComprehensiveAnalysisScore } from '@/components/analysis/ComprehensiveAnalysis/ComprehensiveAnalysisRadarChart'

describe('toArrayFromStringComprehensiveAnalysisScore', () => {
  test('受け取ったスコアの文字列からdataとlabelsを返す（特性が6つ以下の場合）', () => {
    const mockData =
      '- **積極性**: __90__\n' +
      '- **計画性**: __88__\n' +
      '- **広報力**: __85__\n' +
      '- **チームプレイヤー**: __82__\n' +
      '- **協調性**: __80__\n' +
      '- **好奇心**: __75__'
    const mockOutput = {
      data: ['90', '88', '85', '82', '80', '75'],
      labels: ['積極性', '計画性', '広報力', 'チームプレイヤー', '協調性', '好奇心'],
    }
    expect(toArrayFromStringComprehensiveAnalysisScore(mockData)).toStrictEqual(mockOutput)
  })
  test('受け取ったスコアの文字列からdataとlabelsを返す（特性が6つ以上の場合）', () => {
    const mockData =
      '- **積極性**: __90__\n' +
      '- **計画性**: __88__\n' +
      '- **広報力**: __85__\n' +
      '- **チームプレイヤー**: __82__\n' +
      '- **協調性**: __80__\n' +
      '- **好奇心**: __75__' +
      '- **忍耐力**: __50__\n' +
      '- **優しさ**: __79__\n' +
      '- **謙虚さ**: __90__'
    const mockOutput = {
      data: ['90', '88', '85', '82', '80', '75'],
      labels: ['積極性', '計画性', '広報力', 'チームプレイヤー', '協調性', '好奇心'],
    }
    expect(toArrayFromStringComprehensiveAnalysisScore(mockData)).toStrictEqual(mockOutput)
  })
})
