import { css } from '../../../styled-system/css'
import { CommonMeta, ContentsWrapper, FadeInWrapper, PageTitle } from '@/components/common'
import { faUserGear } from '@fortawesome/free-solid-svg-icons'

// TODO: あとで考える
export default function User() {
  return (
    <>
      <CommonMeta title={'Recollect - ユーザ―情報'} description={'ユーザ―情報を表示します。'} />
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
            <PageTitle title={'ユーザ―情報'} icon={faUserGear} />
          </div>
        </ContentsWrapper>
      </FadeInWrapper>
    </>
  )
}
