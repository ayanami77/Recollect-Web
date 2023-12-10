import { Card as TCard } from '@/api/models/card.model'
import { Session } from 'next-auth'
import { FC } from 'react'
import { center, hstack, vstack } from '../../../../styled-system/patterns'
import { css } from '../../../../styled-system/css'
import { FadeInWrapper } from '../../common'
import { ComprehensiveAnalysisRadarChart } from './ComprehensiveAnalysisRadarChart'
import { AnalysisAnalyzeButton } from '../AnalysisAnalyzeButton'

type ComprehensiveAnalysisContainerProps = {
  data: TCard[]
  user: Session['user']
}

export const ComprehensiveAnalysisContainer: FC<ComprehensiveAnalysisContainerProps> = () => {
  // const { data, user } = props;
  return (
    <FadeInWrapper>
      <div
        className={hstack({
          w: 'full',
          mt: '24px',
          md: {
            mt: '40px',
          },
        })}
      >
        <div
          className={css({
            w: 'full',
            p: '14px',
            bg: 'blue.200',
            rounded: '3xl',
            shadow: 'lg',
            md: { p: '24px' },
          })}
        >
          <div className={vstack({ gap: '8px', alignItems: 'start', overflow: 'hidden' })}>
            <h2 className={css({ fontSize: 'xl', fontWeight: 'bold', md: { fontSize: '2xl' } })}>
              全期間
            </h2>
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
                <h2
                  className={css({ fontSize: 'xl', fontWeight: 'bold', md: { fontSize: '2xl' } })}
                >
                  自分史を総合的に分析します
                </h2>
                <div className={hstack({ gap: '24px' })}>
                  {false ? (
                    // <div className={hstack({ flexWrap: 'wrap' })}>
                    //   {content.tags.map((tag, index) => (
                    //     <CharacteristicTag key={index} name={tag} />
                    //   ))}
                    // </div>
                    <></>
                  ) : (
                    <span
                      className={css({
                        fontSize: 'sm',
                        color: 'lightGreen',
                        md: { fontSize: 'md' },
                      })}
                    >
                      分析をするとあなたの特性が表示されます。
                    </span>
                  )}
                </div>
              </div>
              <div>
                <div
                  className={css({
                    h: '248px',
                    mt: '16px',
                    bg: 'slate.100',
                    rounded: 'xl',
                    overflow: 'auto',
                  })}
                >
                  <div className={center({ w: 'full', h: '240px', p: '12px' })}>
                    <p
                      className={css({ fontSize: 'sm', color: 'dimGray', md: { fontSize: 'md' } })}
                    >
                      AIで自分の特性を分析することができます。
                    </p>
                  </div>
                </div>
                <div
                  className={center({
                    maxW: '500px',
                    w: 'full',
                    mx: 'auto',
                    mt: '24px',
                  })}
                >
                  <ComprehensiveAnalysisRadarChart />
                </div>
              </div>
              <AnalysisAnalyzeButton isLoading={false} analysisResult='' onClickFunc={() => {}} />
            </div>
          </div>
        </div>
      </div>
    </FadeInWrapper>
  )
}
