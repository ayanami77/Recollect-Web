import Image from 'next/image'
import { useRouter } from 'next/router'
import { hstack } from '../../../../styled-system/patterns'
import { css } from '../../../../styled-system/css'
import { HamburgerMenu } from './HamburgerMenu/HamburgerMenu'
import { NavigationMenu } from './NavigationMenu/NavigationMenu'
import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { ConfirmModal } from '.'
import Link from 'next/link'

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleConfirmModal = () => {
    setIsOpen((prev) => !prev)
  }

  const onSubmitLogout = async () => {
    // セッションが削除されるため、SSRによって/signinへリダイレクトされる。
    await signOut()
  }

  return (
    <>
      <header
        className={hstack({
          md: { h: '80px', p: '24px', bg: 'transparent' },
          justify: 'space-between',
          h: '60px',
          px: '16px',
          py: '12px',
          pos: 'fixed',
          bg: 'white',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
        })}
      >
        <Link href={router.pathname === '/signin' || '/' ? '/' : '/history'}>
          <div
            className={css({
              md: { w: '200px', h: '80px' },
              w: '160px',
              h: '60px',
              pos: 'relative',
            })}
          >
            <Image
              src={'/img/logo.png'}
              alt={'Recollectのロゴ'}
              fill
              sizes='100%'
              priority
              className={css({ objectFit: 'contain' })}
            />
          </div>
        </Link>
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
