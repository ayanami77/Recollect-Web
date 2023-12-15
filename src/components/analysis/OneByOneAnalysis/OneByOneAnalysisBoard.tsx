import { FC } from 'react'
import { css } from '../../../../styled-system/css'
import { center, hstack, vstack } from '../../../../styled-system/patterns'
import ReactMarkdown from 'react-markdown'
import { CharacteristicTag } from '@/components/common'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { AnalysisIsAnalyzingIcon } from '../AnalysisIsAnalyzingIcon'
import { OneByOneAnalysisPCSwitchButton } from './OneByOneAnalysisPCSwitchButton'
import { OneByOneAnalysisMobileSwitchButton } from './OneByOneAnalysisMobileSwitchButton'
import { Session } from 'next-auth'
import { Card as TCard } from '@/api/models/card.model'
import { toPeriodStringFromNumber } from '@/utils/toPeriodStringFromNumber'
import { useMutateCard } from '@/api/hooks/card/useMutateCard'
import { AnalysisAnalyzeButton } from '../AnalysisAnalyzeButton'

type OneByOneAnalysisBoardProps = {
  content: TCard
  user: Session['user']
  next: () => void
  prev: () => void
}

export const OneByOneAnalysisBoard: FC<OneByOneAnalysisBoardProps> = (props) => {
  const { content, user, next, prev } = props
  const { analyzeCardMutation } = useMutateCard()

  const handleAnalyze = () => {
    analyzeCardMutation.mutate({
      cardData: {
        id: content.id,
        title: content.title,
        content: content.content,
        period: content.period,
      },
      accessToken: user.access_token || '',
    })
  }

  return (
    <div
      className={css({
        w: 'full',
        p: '14px',
        bg: 'blue.200',
        rounded: '3xl',
        shadow: 'lg',
        md: { w: '780px', p: '24px' },
        pos: 'relative',
      })}
    >
      {/* PC表示でのボタン */}
      <div
        className={css({
          display: 'none',
          lg: { display: 'block', pos: 'absolute', top: '240px', left: '-120px' },
        })}
      >
        <OneByOneAnalysisPCSwitchButton
          icon={faChevronLeft}
          isDisabled={analyzeCardMutation.isLoading}
          onClick={prev}
        />
      </div>
      <div
        className={css({
          display: 'none',
          lg: { display: 'block', pos: 'absolute', top: '240px', right: '-120px' },
        })}
      >
        <OneByOneAnalysisPCSwitchButton
          icon={faChevronRight}
          isDisabled={analyzeCardMutation.isLoading}
          onClick={next}
        />
      </div>

      <div className={hstack({ justify: 'space-between' })}>
        <h2
          className={css({
            fontSize: 'xl',
            fontWeight: 'bold',
            px: '12px',
            md: {
              fontSize: '2xl',
            },
          })}
        >
          {toPeriodStringFromNumber(content.period)}
        </h2>
        {/* モバイル表示でのボタン */}
        <div
          className={hstack({
            px: '20px',
            lg: { display: 'none' },
          })}
        >
          <OneByOneAnalysisMobileSwitchButton
            icon={faChevronLeft}
            isDisabled={analyzeCardMutation.isLoading}
            onClick={prev}
          />
          <OneByOneAnalysisMobileSwitchButton
            icon={faChevronRight}
            isDisabled={analyzeCardMutation.isLoading}
            onClick={next}
          />
        </div>
      </div>
      <div
        className={css({
          w: 'full',
          maxW: '780px',
          mt: '12px',
          px: '16px',
          py: '20px',
          bg: 'white',
          rounded: '14px',
          shadow: 'md',
          md: {
            p: '24px',
          },
        })}
      >
        <div className={vstack({ gap: '8px', alignItems: 'start', overflow: 'hidden' })}>
          <h2 className={css({ fontSize: 'xl', fontWeight: 'bold', md: { fontSize: '2xl' } })}>
            {content.title}
          </h2>
          <div className={hstack({ gap: '24px' })}>
            {content.tags.length > 0 ? (
              <div className={hstack({ flexWrap: 'wrap' })}>
                {content.tags.map((tag, index) => (
                  <CharacteristicTag key={index} name={tag} />
                ))}
              </div>
            ) : (
              <span
                className={css({ fontSize: 'sm', color: 'lightGreen', md: { fontSize: 'md' } })}
              >
                分析をするとあなたの特性が表示されます。
              </span>
            )}
          </div>
        </div>

        <div
          className={css({
            h: '248px',
            mt: '16px',
            bg: 'slate.100',
            rounded: 'xl',
            overflow: 'auto',
          })}
        >
          {analyzeCardMutation.isLoading ? (
            <AnalysisIsAnalyzingIcon />
          ) : content.analysisResult ? (
            <ReactMarkdown className={css({ p: '16px', fontSize: 'sm', md: { fontSize: 'md' } })}>
              {content.analysisResult}
            </ReactMarkdown>
          ) : (
            <div className={center({ w: 'full', h: '240px', p: '12px' })}>
              <p className={css({ fontSize: 'sm', color: 'dimGray', md: { fontSize: 'md' } })}>
                AIで自分の特性を分析することができます。
              </p>
            </div>
          )}
        </div>

        <AnalysisAnalyzeButton
          isLoading={analyzeCardMutation.isLoading}
          analysisResult={content.analysisResult}
          onClickFunc={handleAnalyze}
        />
      </div>
    </div>
  )
}
