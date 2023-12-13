import { Session } from 'next-auth'
import { FC } from 'react'
import { hstack, vstack } from '../../../../styled-system/patterns'
import { css } from '../../../../styled-system/css'
import { FadeInWrapper } from '../../common'
import { ComprehensiveAnalysisRadarChart } from './ComprehensiveAnalysisRadarChart'
import { AnalysisAnalyzeButton } from '../AnalysisAnalyzeButton'
import { useMutateUser } from '@/api/hooks/user/useMutateUser'
import { ComprehensiveAnalysisBoard } from './ComprehensiveAnalysisBoard'
import { User as TUser } from '@/api/models/user.model'

type ComprehensiveAnalysisContainerProps = {
  data: TUser
  user: Session['user']
}

export const ComprehensiveAnalysisContainer: FC<ComprehensiveAnalysisContainerProps> = (props) => {
  const { data, user } = props
  const { analyzeMutation } = useMutateUser()

  const handleAnalyze = () => {
    analyzeMutation.mutate({
      accessToken: user.access_token || '',
    })
  }

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
                  <span
                    className={css({
                      fontSize: 'sm',
                      color: 'lightGreen',
                      md: { fontSize: 'md' },
                    })}
                  >
                    分析には時間がかかります。また、分析の結果が不安定な場合があります。
                  </span>
                </div>
              </div>
              <ComprehensiveAnalysisBoard
                isLoading={analyzeMutation.isLoading}
                analysisResult={data.comprehensiveAnalysisResult}
              />
              <AnalysisAnalyzeButton
                isLoading={analyzeMutation.isLoading}
                analysisResult={data.comprehensiveAnalysisResult}
                onClickFunc={handleAnalyze}
              />
              <div className={css({ mt: '32px' })}>
                <div className={vstack({ gap: '8px', alignItems: 'start', overflow: 'hidden' })}>
                  <h2
                    className={css({ fontSize: 'lg', fontWeight: 'bold', md: { fontSize: 'xl' } })}
                  >
                    あなたの特性チャート
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
                        })}
                      >
                        分析をするとあなたの特性が数値で可視化されます。
                      </span>
                    )}
                  </div>
                </div>
                <ComprehensiveAnalysisRadarChart
                  comprehensiveAnalysisScore={data.comprehensiveAnalysisScore}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeInWrapper>
  )
}
