/**
 * 正規表現を使って、マークダウンからタグを抽出する処理
 */
export const generateTagsFromAnalysisResult = (markdownString: string): string[] => {
  const regex = /\*\*(.*?)\*\*/g
  const newTags = markdownString.match(regex)?.map((v) => v.slice(2, v.length - 2))
  if (newTags === undefined) return []
  return newTags
}
