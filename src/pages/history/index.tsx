import { css } from '../../../styled-system/css'
import MainLayout from '@/components/layouts/MainLayout'
import {
  FadeInWrapper,
  CommonMeta,
  Toast,
  FlowTutorial,
  PageTitle,
  ContentsWrapper,
} from '@/components/common'
import { HistoryContainer } from '@/components/history'
import { useQueryCards } from '@/api/hooks/card/useQueryCard'
import useStore from '@/store'
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons'

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
          <ContentsWrapper>
            {/* TODO: responsive layout */}
            <div
              className={css({
                w: 'full',
                maxW: '780px',
                mx: 'auto',
                mt: '24px',
              })}
            >
              <PageTitle title={'自分史をみる'} icon={faMapLocationDot} />
              <HistoryContainer data={data ? data : []} />
            </div>
            <Toast
              content={{
                status: store.type,
                message: store.message,
                isShow: store.isShow,
              }}
            />
          </ContentsWrapper>
        </FadeInWrapper>
      </MainLayout>
      {data?.length === 0 && <FlowTutorial />}
    </>
  )
}
