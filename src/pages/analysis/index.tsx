import { FadeInWrapper } from '@/components/common/framer-motion/FadeInWrapper'
import MainLayout from '@/components/layouts/MainLayout'
import { CommonMeta } from '@/components/common/meta/CommonMeta'
import { useQueryCard } from '@/api/hooks/card/useQueryCard'
import { AnalysisContainer } from '@/components/analysis/partials/AnalysisContainer'
import { useRouter } from 'next/router'

export default function Analysis() {
  const router = useRouter()
  const { listCardsQuery } = useQueryCard()
  const { data } = listCardsQuery

  return (
    <>
      <CommonMeta
        title={'Recollect - AI分析'}
        description={'Aiを利用することで、自分史カードから自分の特性を知ることができます。'}
      />
      <MainLayout>
        <FadeInWrapper>
          <AnalysisContainer content={{ data, cardId: router.query.card_id as string }} />
        </FadeInWrapper>
      </MainLayout>
    </>
  )
}
