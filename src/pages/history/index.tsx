import dynamic from 'next/dynamic'
import { css } from '../../../styled-system/css'
import { FadeInWrapper, CommonMeta, PageTitle, ContentsWrapper } from '@/components/common'
import { useQueryCards } from '@/api/hooks/card/useQueryCard'
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons'
import { GetServerSideProps } from 'next'
import { Session, getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import { hstack } from '../../../styled-system/patterns'
import { useState } from 'react'

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
  const [isAsc, setIsAsc] = useState(true)

  const handleSort = () => {
    setIsAsc((prev) => !prev)
  }

  return (
    <>
      <CommonMeta
        title={'Recollect - 自分史をみる'}
        description={'自分史を整理し、時系列順で見ることができます。'}
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
            <div
              className={hstack({
                mb: '24px',
                alignItems: 'center',
                justify: 'space-between',
              })}
            >
              <PageTitle title={'自分史をみる'} icon={faMapLocationDot} />
              <HistorySortButton isAsc={isAsc} onClickFunc={handleSort} />
            </div>
            <HistoryContainer data={data ?? []} user={user} isAsc={isAsc} />
          </div>
        </ContentsWrapper>
      </FadeInWrapper>
      {data?.length === 0 && <HistoryToTutorialButton />}
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
