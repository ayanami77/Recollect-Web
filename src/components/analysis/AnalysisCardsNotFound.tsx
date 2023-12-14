import Link from 'next/link'
import { FadeInWrapper } from '../common'
import { css } from '../../../styled-system/css'

export const AnalysisCardsNotFound = () => {
  return (
    <FadeInWrapper>
      <div
        className={css({
          mt: '24px',
          md: {
            mt: '40px',
          },
        })}
      >
        <div className={css({ px: '20px', py: '16px' })}>
          自分史が作成されていません。
          <Link href={'/history'}>
            <span className={css({ color: 'blue.400' })}>自分史をみる</span>
          </Link>
          からデータを登録することができます。
        </div>
      </div>
    </FadeInWrapper>
  )
}
