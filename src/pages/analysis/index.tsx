import { ContentsWrapper, FadeInWrapper, PageTitle } from '@/components/common'
import MainLayout from '@/components/layouts/MainLayout'
import { CommonMeta } from '@/components/common/meta/CommonMeta'
import { useQueryCards } from '@/api/hooks/card/useQueryCard'
import { AnalysisContainer } from '@/components/analysis'
import { useRouter } from 'next/router'
import { css } from '../../../styled-system/css'
import { faMagnifyingGlassChart } from '@fortawesome/free-solid-svg-icons'

export default function Analysis() {
  const router = useRouter()
  const { data } = useQueryCards()

  return (
    <>
      <CommonMeta
        title={'Recollect - AI分析'}
        description={'Aiを利用することで、自分史カードから自分の特性を知ることができます。'}
      />
      <MainLayout>
        <FadeInWrapper>
          <ContentsWrapper>
            <div
              className={css({
                w: 'full',
                maxW: '780px',
                mx: 'auto',
                mt: '24px',
              })}
            >
              <PageTitle title={'分析をする'} icon={faMagnifyingGlassChart} />
              <AnalysisContainer data={data ?? []} cardId={router.query.card_id} />
            </div>
          </ContentsWrapper>
        </FadeInWrapper>
      </MainLayout>
    </>
  )
}
