import { ContentsWrapper, FadeInWrapper } from '@/components/common'
import { CommonMeta } from '@/components/common/meta'
import { GetServerSideProps } from 'next'
import { Session, getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import { TutorialContainer } from '@/components/tutorial/TutorialContainer'
import { css } from '../../../styled-system/css'

type Props = {
  user: Session['user']
}

export default function Tutorial({ user }: Props) {
  return (
    <>
      <CommonMeta title={'Recollect - チュートリアル'} description={'チュートリアルページです。'} />
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
            <TutorialContainer user={user} />
          </div>
        </ContentsWrapper>
      </FadeInWrapper>
    </>
  )
}

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
