import { FC } from 'react'
import { Analyzing } from '.'
import { css } from '../../../../styled-system/css'
import { center, hstack, vstack } from '../../../../styled-system/patterns'
import ReactMarkdown from 'react-markdown'
import { useMutateOpenAIResponse } from '@/api/hooks/open_ai/useMutateOpenAi'

type BoardProps = {
  content: {
    id: string
    period: string
    title: string
    content: string
    analysisResult: string
    tags: string[]
    createdAt: string
    updatedAt: string
  }
}

const makePrompt = (content: string): string => {
  return `
    下記文章を読み、その人の特性を分析し、マークダウン形式で出力して。
    なお、文章のフォーマットは以下のようなものとする

    フォーマット例:「
        - **責任感**: 美化委員として学校清掃に取り組み、地域ボランティアに自発的に参加する姿勢から、責任感が強いことが分かります。\n- **努力家**: 自由研究での入賞や清掃活動での頑張りから、努力を惜しまない姿勢が伺えます。\n
    」

    文章:「
      ${content}
    」
  `
}

export const Board: FC<BoardProps> = (props) => {
  const { content } = props

  const { openaiResponseMutation } = useMutateOpenAIResponse()
  const handleAnalyze = () => {
    openaiResponseMutation.mutate({ id: content.id, prompt: makePrompt(content.content) })
  }
  return (
    <div
      className={css({
        w: '720px',
        minH: '480px',
        px: '40px',
        py: '24px',
        bg: 'white',
        rounded: '14px',
        shadow: 'xl',
      })}
    >
      <div className={hstack({ gap: '40px' })}>
        <div
          className={css({
            minW: '360px',
            p: '24px',
            shadow: 'xl',
            rounded: '3xl',
            bg: 'slate.100',
          })}
        >
          <h2 className={css({ fontSize: '2xl', fontWeight: 'bold' })}>{content.period}</h2>
          <p className={css({ fontSize: 'md', mt: '8px', color: 'dimGray' })}>{content.title}</p>
        </div>
        <div className={vstack({ alignItems: 'start' })}>
          <p className={css({ fontSize: '2xl', fontWeight: 'bold' })}>について</p>
          <button
            className={css({
              bg: 'dimBlue',
              fontWeight: 'bold',
              fontSize: '20px',
              color: 'white',
              p: '12px',
              rounded: '12px',
              cursor: 'pointer',
            })}
            onClick={handleAnalyze}
          >
            {content.analysisResult ? 'もう一度試す' : 'AIで特性を知る'}
          </button>
        </div>
      </div>
      <div className={css({ w: 'full', h: '4px', bg: 'slate.200', mt: '24px', rounded: 'full' })} />
      {openaiResponseMutation.isLoading ? (
        <Analyzing />
      ) : content.analysisResult ? (
        <ReactMarkdown className={css({ p: '16px' })}>{content.analysisResult}</ReactMarkdown>
      ) : (
        <div className={center({ w: 'full', h: '280px' })}>
          <p className={css({ fontSize: 'lg', color: 'dimGray' })}>
            AIで自分の特性を分析してみよう!
          </p>
        </div>
      )}
    </div>
  )
}
