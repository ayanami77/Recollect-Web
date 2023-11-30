import { ContentsWrapper, FadeInWrapper, PageTitle } from '@/components/common'
import { CommonMeta } from '@/components/common/meta/CommonMeta'
import { useQueryCards } from '@/api/hooks/card/useQueryCard'
import { AnalysisContainer } from '@/components/analysis'
import { useRouter } from 'next/router'
import { css } from '../../../styled-system/css'
import { faMagnifyingGlassChart } from '@fortawesome/free-solid-svg-icons'
import { GetServerSideProps } from 'next'
import { Session, getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'

type Props = {
  user: Session['user']
}

const Analysis = ({ user }: Props) => {
  const router = useRouter()
  const { data } = useQueryCards(user.access_token || '')

  return (
    <>
      <CommonMeta
        title={'Recollect - 自分史を分析する'}
        description={'AIを利用することで、自分史カードから自分の特性を知ることができます。'}
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
            <PageTitle title={'自分史を分析をする'} icon={faMagnifyingGlassChart} />
            <AnalysisContainer data={data ?? []} cardId={router.query.card_id} user={user} />
          </div>
        </ContentsWrapper>
      </FadeInWrapper>
    </>
  )
}

export default Analysis

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
