import { css } from '../../../styled-system/css'
import MainLayout from '@/components/layouts/MainLayout'
import {
  FadeInWrapper,
  CommonMeta,
  FlowTutorial,
  PageTitle,
  ContentsWrapper,
} from '@/components/common'
import { HistoryContainer } from '@/components/history'
import { useQueryCards } from '@/api/hooks/card/useQueryCard'
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons'

export default function History() {
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
            <div
              className={css({
                w: 'full',
                maxW: '780px',
                mx: 'auto',
                mt: '24px',
              })}
            >
              <PageTitle title={'自分史をみる'} icon={faMapLocationDot} />
              <HistoryContainer data={data ?? []} />
            </div>
          </ContentsWrapper>
        </FadeInWrapper>
      </MainLayout>
      {/* TODO: チュートリアルの状態をどう持つか再検討したい */}
      {data?.length === 0 && <FlowTutorial />}
    </>
  )
}
