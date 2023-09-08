import { css } from '../../../styled-system/css'
import MainLayout from '@/components/layouts/MainLayout'
import { FadeInWrapper, CommonMeta } from '@/components/common'
import { CardsContainer } from '@/components/history'
import { useQueryCard } from '@/api/hooks/card/useQueryCard'

export default function History() {
  const { listCardsQuery } = useQueryCard()
  const { data } = listCardsQuery

  const userName = 'naruto8864'

  return (
    <>
      <CommonMeta
        title={'Recollect - 自分史'}
        description={'自分史を時系列で見ることができます。'}
      />
      <MainLayout>
        <FadeInWrapper>
          <div className={css({ w: '840px', mx: 'auto', mt: '24px' })}>
            <h2
              className={css({
                fontSize: '3xl',
                fontWeight: 'bold',
                borderLeftWidth: '8px',
                borderColor: 'dimBlue',
                px: '16px',
              })}
            >
              {userName}さんの自分史
            </h2>
            <CardsContainer data={data ? data : []} />
          </div>
        </FadeInWrapper>
      </MainLayout>
    </>
  )
}
