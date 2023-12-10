import dynamic from 'next/dynamic'
import { css } from '../../../styled-system/css'
import { CommonMeta, PageTitle, ContentsWrapper } from '@/components/common'
import { useQueryCards } from '@/api/hooks/card/useQueryCard'
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons'
import { GetServerSideProps } from 'next'
import { Session, getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import { hstack } from '../../../styled-system/patterns'
import { useState } from 'react'
import { sortCardsByPeriod } from '@/utils/sortCardsByPeriod'

const HistoryContainer = dynamic(() =>
  import('@/components/history/HistoryContainer').then((mod) => mod.HistoryContainer),
)
const HistoryToTutorialButton = dynamic(() =>
  import('@/components/history/HistoryToTutorialButton').then((mod) => mod.HistoryToTutorialButton),
)
const HistorySortButton = dynamic(() =>
  import('@/components/history/HistorySortButton').then((mod) => mod.HistorySortButton),
)

type Props = {
  user: Session['user']
}

const History = ({ user }: Props) => {
  const { data } = useQueryCards(user.access_token || '')
  const allCards = sortCardsByPeriod(data ?? [])
  const [isAscPeriod, setIsAscPeriod] = useState(true)

  const handleSort = () => {
    setIsAscPeriod((prev) => !prev)
  }

  return (
    <>
      <CommonMeta
        title={'Recollect - 自分史をみる'}
        description={'自分史を整理し、時系列順で見ることができます。'}
      />
      <ContentsWrapper>
        <div
          className={css({
            w: 'full',
            maxW: '780px',
            mx: 'auto',
            mt: '24px',
          })}
        >
          <div
            className={hstack({
              mb: '24px',
              alignItems: 'center',
              justify: 'space-between',
            })}
          >
            <PageTitle title={'自分史をみる'} icon={faMapLocationDot} />
            <HistorySortButton isAscPeriod={isAscPeriod} onClickFunc={handleSort} />
          </div>
          <HistoryContainer allCards={allCards} user={user} isAscPeriod={isAscPeriod} />
        </div>
      </ContentsWrapper>
      {/* いずれかのperiodで自分史が登録されていない場合は、チュートリアルへのボタンを表示する */}
      {Object.values(allCards).some((cards) => {
        return cards.length === 0
      }) && <HistoryToTutorialButton />}
    </>
  )
}

export default History

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions)
  const user = session?.user

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  return {
    props: { user },
  }
}
