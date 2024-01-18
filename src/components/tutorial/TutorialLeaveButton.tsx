import { FC, useState } from 'react'
import { css } from '../../../styled-system/css'
import { useRouter } from 'next/router'
import { hstack } from '../../../styled-system/patterns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { ConfirmModal } from '../common'

export const TutorialLeaveButton: FC = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleConfirmModal = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className={css({ w: 'fit', pb: '6px' })}>
      <button
        className={css({
          bg: 'white',
          rounded: 'xl',
          shadow: 'xl',
          cursor: 'pointer',
        })}
        onClick={handleConfirmModal}
      >
        <div className={hstack({ gap: '24px', p: '20px' })}>
          <span className={css({ fontSize: 'md', fontWeight: 'bold', color: 'black' })}>
            チュートリアルを退出する
          </span>
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            style={{ width: '26px', color: '#0C4C97' }}
          />
        </div>
      </button>
      {isOpen && (
        <ConfirmModal
          content={{
            onCancel: handleConfirmModal,
            onConfirm: () => router.push('/history'),
            cancelMessage: 'キャンセル',
            confirmMessage: '終了する',
            message: 'チュートリアルを終了しますか？ 内容は保存されません。',
          }}
        />
      )}
    </div>
  )
}
