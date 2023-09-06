import { FC, useState } from 'react'
import { Analyzing } from '.'
import { css } from '../../../../styled-system/css'
import { center, hstack, vstack } from '../../../../styled-system/patterns'
import ReactMarkdown from 'react-markdown'

type BoardProps = {
  content: {
    id: number
    period: string
    title: string
    content: string
    tags: string[]
    createdAt: string
    updatedAt: string
  }
}

const markdownString =
  '- **責任感**: 美化委員として学校清掃に取り組み、地域ボランティアに自発的に参加する姿勢から、責任感が強いことが分かります。\n- **努力家**: 自由研究での入賞や清掃活動での頑張りから、努力を惜しまない姿勢が伺えます。\n- **創造力**: 夏休みの自由研究で入賞したことから、独自のアイデアや創造力を活かす能力があることが窺えます。\n- **協力意識**: 地域のボランティア活動への自己応募から、協力と共同作業への意欲が感じられます。'

/**
 * 正規表現を使って、マークダウンからタグを抽出する処理
 */
const generateNewTags = (markdownString: string): string[] => {
  const regex = /\*\*(.*?)\*\*/g
  const newTags = markdownString.match(regex)?.map((v) => v.slice(2, v.length - 2))
  if (newTags === undefined) {
    return ['']
  }
  return newTags
}

export const Board: FC<BoardProps> = (props) => {
  const { content } = props

  // ここらへんは全部親コンポーネントからもらうようにしてもいいか。
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isSuccessful, setIsSuccessful] = useState(false) //今は適当
  const handleAnalyze = () => {
    setIsSuccessful(false)
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      setIsSuccessful(true)
      console.log(generateNewTags(markdownString))
    }, 6000)
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
      <div className={hstack({ justify: 'space-between' })}>
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
              fontWeight: 'medium',
              fontSize: '20px',
              color: 'white',
              p: '12px',
              rounded: '12px',
              cursor: 'pointer',
            })}
            onClick={handleAnalyze}
          >
            AIで自己の特性を知る
          </button>
        </div>
      </div>
      <div className={css({ w: 'full', h: '4px', bg: 'slate.200', mt: '24px', rounded: 'full' })} />
      {isAnalyzing ? (
        <Analyzing />
      ) : isSuccessful ? (
        <ReactMarkdown className={css({ p: '16px' })}>{markdownString}</ReactMarkdown>
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
