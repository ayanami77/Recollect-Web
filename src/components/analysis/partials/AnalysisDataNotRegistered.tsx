import Link from 'next/link'
import { css } from '../../../../styled-system/css'

export const AnalysisDataNotRegistered = () => {
  return (
    <div>
      自分史が作成されていません。
      <Link href={'/history'}>
        <span className={css({ color: 'blue.400' })}>自分史ページ</span>
      </Link>
      からデータを登録することができます。
    </div>
  )
}
