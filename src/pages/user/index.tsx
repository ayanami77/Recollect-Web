import { css } from '../../../styled-system/css'
import { CommonMeta, ContentsWrapper, PageTitle } from '@/components/common'
import { faUserGear } from '@fortawesome/free-solid-svg-icons'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import { useQueryUser } from '@/api/hooks/user/useQueryUser'
import { UserContainer } from '@/components/user'
import { User as TUser } from '@/api/models/user.model'

const User = () => {
  const { data } = useQueryUser()
  const userInfo: Pick<TUser, 'userId'> = {
    userId: data?.userId ?? '',
  }
  return (
    <>
      <CommonMeta title={'Recollect - ユーザー情報'} description={'ユーザー情報を表示します。'} />
      <ContentsWrapper>
        <div
          className={css({
            w: 'full',
            maxW: '780px',
            mx: 'auto',
            mt: '24px',
          })}
        >
          <PageTitle title={'ユーザー情報'} icon={faUserGear} />
          <UserContainer userInfo={userInfo} />
        </div>
      </ContentsWrapper>
    </>
  )
}
export default User

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }
  const user = session?.user
  return {
    props: { user },
  }
}
