import Image from 'next/image'
import { useRouter } from 'next/router'
import { hstack } from '../../../../styled-system/patterns'
import { css } from '../../../../styled-system/css'
import { HamburgerMenu } from './HamburgerMenu/HamburgerMenu'
import { NavigationMenu } from './NavigationMenu/NavigationMenu'
import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { ConfirmModal } from '.'

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

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
      <header
        className={hstack({
          md: { h: '80px', p: '24px' },
          justify: 'space-between',
          h: '60px',
          p: '12px',
          pos: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
        })}
      >
        <div
          className={css({ md: { w: '200px', h: '80px' }, w: '160px', h: '60px', pos: 'relative' })}
        >
          <Image
            src={'/logo.png'}
            alt={'Recollectのロゴ'}
            fill
            className={css({ objectFit: 'contain' })}
          />
        </div>
        {['/history', '/analysis', '/user'].includes(router.pathname) && (
          <>
            {/* ナビゲーションメニュー */}
            <div className={css({ display: 'none', md: { display: 'block' } })}>
              <NavigationMenu onClickFunc={handleConfirmModal} />
            </div>
            {/* ハンバーガーメニュー */}
            <div className={css({ display: 'block', md: { display: 'none' } })}>
              <HamburgerMenu onClickFunc={handleConfirmModal} />
            </div>
          </>
        )}
      </header>
      {/* ログアウト時の確認モーダル */}
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
