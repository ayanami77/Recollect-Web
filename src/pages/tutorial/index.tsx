import { ContentsWrapper, FadeInWrapper } from '@/components/common'
import { CommonMeta } from '@/components/common/meta'
import { GetServerSideProps } from 'next'
import { Session, getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import { TutorialContainer } from '@/components/tutorial/TutorialContainer'
import { css } from '../../../styled-system/css'
import { TutorialLeaveButton } from '@/components/tutorial'

type Props = {
  user: Session['user']
}

const Tutorial = ({ user }: Props) => {
  return (
    <>
      <CommonMeta
        title={'Recollect - チュートリアル'}
        description={'自分史作成のチュートリアルです。'}
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
            <TutorialContainer user={user} />
          </div>
          <TutorialLeaveButton />
        </ContentsWrapper>
      </FadeInWrapper>
    </>
  )
}

export default Tutorial

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
