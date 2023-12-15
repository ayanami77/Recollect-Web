import dynamic from 'next/dynamic'
import { ContentsWrapper, PageTitle } from '@/components/common'
import { CommonMeta } from '@/components/common/meta/CommonMeta'
import { useQueryCards } from '@/api/hooks/card/useQueryCard'
import { useRouter } from 'next/router'
import { css } from '../../../styled-system/css'
import { faMagnifyingGlassChart } from '@fortawesome/free-solid-svg-icons'
import { GetServerSideProps } from 'next'
import { Session, getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import { flex } from '../../../styled-system/patterns'
import { AnalysisTabs } from '@/components/analysis/AnalysisTabs'
import { useState } from 'react'
import { match } from 'ts-pattern'
import { useQueryUser } from '@/api/hooks/user/useQueryUser'
import { AnalysisCardsNotFound } from '@/components/analysis/AnalysisCardsNotFound'

const OneByOneAnalysisContainer = dynamic(() =>
  import('@/components/analysis/OneByOneAnalysis').then((mod) => mod.OneByOneAnalysisContainer),
)

const ComprehensiveAnalysisContainer = dynamic(() =>
  import('@/components/analysis/ComprehensiveAnalysis').then(
    (mod) => mod.ComprehensiveAnalysisContainer,
  ),
)

type Props = {
  user: Session['user']
}

export type TAnalysisType = 'onebyone' | 'comprehensive'

const Analysis = ({ user }: Props) => {
  const router = useRouter()
  const [analysisType, setAnalysisType] = useState<TAnalysisType>('onebyone')

  const { data: cardsData, isLoading } = useQueryCards(user.access_token || '')
  const { data: userData } = useQueryUser(user.access_token || '')

  return (
    <>
      <CommonMeta
        title={'Recollect - 自分史を分析する'}
        description={'自分史を分析して、自分の特性を知ることができます。'}
      />
      <ContentsWrapper>
        <div
          className={css({
            w: 'full',
            maxW: '780px',
            mx: 'auto',
            mt: '24px',
          })}
        >
          <div
            className={flex({
              direction: 'column',
              md: {
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            })}
          >
            <PageTitle title={'自分史を分析する'} icon={faMagnifyingGlassChart} />
            <AnalysisTabs analysisType={analysisType} setAnalysisType={setAnalysisType} />
          </div>
          {!cardsData?.length ? (
            // 自分史データが存在しない場合
            <AnalysisCardsNotFound />
          ) : (
            !isLoading &&
            match(analysisType)
              .with('onebyone', () => (
                <OneByOneAnalysisContainer
                  data={cardsData ?? []}
                  cardId={router.query.card_id}
                  user={user}
                />
              ))
              .with('comprehensive', () => (
                <ComprehensiveAnalysisContainer
                  data={
                    userData ?? {
                      // TODO
                      userId: '',
                      userName: '',
                      comprehensiveAnalysisResult: '',
                      comprehensiveAnalysisScore: '',
                      createdAt: '',
                      updatedAt: '',
                    }
                  }
                  user={user}
                />
              ))
              .exhaustive()
          )}
        </div>
      </ContentsWrapper>
    </>
  )
}

export default Analysis

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions)
  const user = session?.user

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  return {
    props: { user },
  }
}
