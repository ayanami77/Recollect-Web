import { useMutateUser } from '@/api/hooks/user/useMutateUser'
import { css } from '../../../styled-system/css'
import { useState } from 'react'
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

// TODO: あとで考える
export default function User() {
  const [isOpen, setIsOpen] = useState(false)
  const { logoutMutation } = useMutateUser()
  const handleConfirmModal = () => {
    setIsOpen((prev) => !prev)
  }
  const onSubmitLogout = async () => {
    logoutMutation.mutate()
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
            <button
              className={hstack({
                w: '280px',
                p: '20px',
                listStyle: 'none',
                shadow: 'xl',
                rounded: 'xl',
                mt: '20px',
                gap: '20px',
                cursor: 'pointer',
                _hover: {
                  bg: 'gray',
                  rounded: 'xl',
                },
                md: {
                  p: '20px',
                },
              })}
              onClick={handleConfirmModal}
            >
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                style={{ width: '32px', height: '32px', color: '#0C4C97' }}
              />
              <span className={css({ fontWeight: 'bold', fontSize: 'xl', color: 'black ' })}>
                ログアウト
              </span>
            </button>
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
          </div>
        </ContentsWrapper>
      </FadeInWrapper>
    </>
  )
}
