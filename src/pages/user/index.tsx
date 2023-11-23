import { m } from 'framer-motion'
import { css } from '../../../styled-system/css'
import {
  CommonMeta,
  ConfirmModal,
  ContentsWrapper,
  FadeInWrapper,
  PageTitle,
} from '@/components/common'
import { faArrowRightFromBracket, faUserGear } from '@fortawesome/free-solid-svg-icons'
import { hstack } from '../../../styled-system/patterns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'

// TODO: あとで考える
const User = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleConfirmModal = () => {
    setIsOpen((prev) => !prev)
  }
  const onSubmitLogout = async () => {
    // The session will be deleted, and the useSession hook is notified, so any indication about the user will be shown as logged out automatically.
    await signOut({
      callbackUrl: 'http://localhost:3000/signin',
    })
  }
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
            <div className={css({ mt: '32px' })}>
              <m.button
                className={hstack({
                  w: '280px',
                  bg: 'white',
                  p: '16px',
                  listStyle: 'none',
                  shadow: 'xl',
                  rounded: 'xl',
                  gap: '20px',
                  cursor: 'pointer',
                  _hover: {
                    bg: 'gray',
                    rounded: 'xl',
                  },
                })}
                whileTap={{ scale: 0.9 }}
                onClick={handleConfirmModal}
              >
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  style={{ width: '32px', height: '32px', color: '#0C4C97' }}
                />
                <span className={css({ fontWeight: 'bold', color: 'black ' })}>ログアウト</span>
              </m.button>
            </div>
          </div>
        </ContentsWrapper>
      </FadeInWrapper>
      {isOpen && (
        <ConfirmModal
          content={{
            onCancel: handleConfirmModal,
            onConfirm: onSubmitLogout,
            cancelMessage: 'キャンセル',
            confirmMessage: 'ログアウト',
            message: 'ログアウトしますか？',
          }}
        />
      )}
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
