import { FC } from 'react'
import { m } from 'framer-motion'
import { css } from '../../../styled-system/css'
import { center, hstack, vstack } from '../../../styled-system/patterns'
import ReactMarkdown from 'react-markdown'
import { CharacteristicTag } from '@/components/common'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
  faMagnifyingGlassChart,
} from '@fortawesome/free-solid-svg-icons'
import { AnalysisIsAnalyzingIcon } from './AnalysisIsAnalyzingIcon'
import { AnalysisMobileSwitchButton } from './AnalysisMobileSwitchButton'
import { AnalysisPCSwitchButton } from './AnalysisPCSwitchButton'
import { Session } from 'next-auth'
import { Card as TCard } from '@/api/models/card.model'
import { toPeriodStringFromNumber } from '@/utils/toPeriodStringFromNumber'
import { useMutateCard } from '@/api/hooks/card/useMutateCard'
import Link from 'next/link'

type AnalysisBoardProps = {
  content: TCard
  user: Session['user']
  next: () => void
  prev: () => void
}

export const AnalysisBoard: FC<AnalysisBoardProps> = (props) => {
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
        <AnalysisPCSwitchButton
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
        <AnalysisPCSwitchButton
          icon={faChevronRight}
          isDisabled={analyzeCardMutation.isLoading}
          onClick={next}
        />
      </div>

      <div className={hstack({ justify: 'space-between' })}>
        <h2
          className={css({
            fontSize: '2xl',
            fontWeight: 'bold',
            px: '12px',
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
          <AnalysisMobileSwitchButton
            icon={faChevronLeft}
            isDisabled={analyzeCardMutation.isLoading}
            onClick={prev}
          />
          <AnalysisMobileSwitchButton
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

        <m.button
          className={hstack({
            maxW: '280px',
            w: 'full',
            mx: 'auto',
            mt: '16px',
            px: '20px',
            py: '12px',
            bg: 'dimBlue',
            fontSize: 'md',
            fontWeight: 'bold',
            color: 'white',
            rounded: 'xl',
            cursor: 'pointer',
            justify: 'center',
            _disabled: {
              opacity: '0.8',
              cursor: 'default',
            },
            md: {
              fontSize: 'lg',
            },
          })}
          disabled={analyzeCardMutation.isLoading ? true : false}
          onClick={handleAnalyze}
          whileTap={analyzeCardMutation.isLoading ? { scale: 1 } : { scale: 0.9 }}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlassChart}
            style={{ width: '24px', height: '24px', color: 'white' }}
          />
          {content.analysisResult ? 'もう一度分析してみる' : '分析してみる'}
        </m.button>
      </div>
    </div>
  )
}
