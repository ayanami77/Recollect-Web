import { css } from '../../../styled-system/css'
import MainLayout from '@/components/layouts/MainLayout'
import { FadeInWrapper, CommonMeta, Toast, FlowTutorial } from '@/components/common'
import { CardsContainer } from '@/components/history'
import { useQueryCards } from '@/api/hooks/card/useQueryCard'
import useStore from '@/store'

export default function History() {
  const store = useStore()
  const { data } = useQueryCards()

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
              {'naruto8864'}さんの自分史
            </h2>
            <CardsContainer data={data ? data : []} />
          </div>
          <Toast
            content={{
              status: store.type,
              message: store.message,
              isShow: store.isShow,
            }}
          />
        </FadeInWrapper>
      </MainLayout>
      {data?.length === 0 && <FlowTutorial />}
    </>
  )
}
