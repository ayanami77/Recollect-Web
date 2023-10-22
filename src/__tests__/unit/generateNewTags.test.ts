// importするとopenaiライブラリとの関係でエラーになってしまうのでコピペした
export const generateNewTags = (markdownString: string): string[] => {
  const regex = /\*\*(.*?)\*\*/g
  const newTags = markdownString.match(regex)?.map((v) => v.slice(2, v.length - 2))
  if (newTags === undefined) return []
  return newTags
}

const mockData =
  '- **リーダーシップ**: 開発チームのリーダーを務め、進捗管理やメンバーのフォローを行い、チームをまとめる力を持っている。\n- **努力家**: 開発に真剣に取り組み、コンテストで金賞と最優秀賞を受賞することができた。努力を惜しまず、目標達成に向けて頑張る姿勢がある。\n- **技術力**: 高品質な制作物と効率的なプロジェクト運営を両立するために、技術力を身につける努力を行っている。'
describe('generateNewTags', () => {
  test('マークダウンからタグを抽出し、配列として返す', () => {
    expect(generateNewTags(mockData)).toStrictEqual(['リーダーシップ', '努力家', '技術力'])
  })
})
