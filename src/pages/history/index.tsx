import { css } from '../../../styled-system/css'
import { FadeInWrapper, CommonMeta, PageTitle, ContentsWrapper } from '@/components/common'
import { HistoryContainer, HistoryToTutorialButton } from '@/components/history'
import { useQueryCards } from '@/api/hooks/card/useQueryCard'
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons'

const History = () => {
  const { data } = useQueryCards()

  return (
    <>
      <CommonMeta
        title={'Recollect - 自分史'}
        description={'自分史を時系列で見ることができます。'}
      />
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
      {/* TODO: チュートリアルの状態をどう持つか再検討したい */}
      {data?.length === 0 && <HistoryToTutorialButton />}
    </>
  )
}

export default History
