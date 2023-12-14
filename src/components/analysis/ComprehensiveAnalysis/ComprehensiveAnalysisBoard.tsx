import { center } from '../../../../styled-system/patterns'
import { css } from '../../../../styled-system/css'
import ReactMarkdown from 'react-markdown'
import { AnalysisIsAnalyzingIcon } from '../AnalysisIsAnalyzingIcon'
import { FC } from 'react'

type ComprehensiveAnalysisBoardProps = {
  isLoading: boolean
  analysisResult: string
}
export const ComprehensiveAnalysisBoard: FC<ComprehensiveAnalysisBoardProps> = (props) => {
  const { isLoading, analysisResult } = props
  return (
    <div
      className={css({
        h: '248px',
        mt: '16px',
        bg: 'slate.100',
        rounded: 'xl',
        overflow: 'auto',
      })}
    >
      {isLoading ? (
        <AnalysisIsAnalyzingIcon />
      ) : analysisResult ? (
        <ReactMarkdown className={css({ p: '16px', fontSize: 'sm', md: { fontSize: 'md' } })}>
          {analysisResult}
        </ReactMarkdown>
      ) : (
        <div className={center({ w: 'full', h: '240px', p: '12px' })}>
          <p className={css({ fontSize: 'sm', color: 'dimGray', md: { fontSize: 'md' } })}>
            AIで自分の特性を分析することができます。
          </p>
        </div>
      )}
    </div>
  )
}
