import { css } from '../../../styled-system/css'
import { CommonMeta, ContentsWrapper, FadeInWrapper, PageTitle } from '@/components/common'
import { faUserGear } from '@fortawesome/free-solid-svg-icons'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import { useState } from 'react'
import { ChangeLanguagePullDown } from '@/components/user'

// TODO: あとで考える
const User = () => {
  const [language, setLanguage] = useState('ja')

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
            <ChangeLanguagePullDown language={language} setLanguage={setLanguage} />
          </div>
        </ContentsWrapper>
      </FadeInWrapper>
    </>
  )
}
export default User

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
