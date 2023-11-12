import { FC, useEffect, useRef, useState } from 'react'
import { css } from '../../../../styled-system/css'
import { center } from '../../../../styled-system/patterns'
import { m } from 'framer-motion'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faBars,
  faClose,
  faMagnifyingGlassChart,
  faMapLocationDot,
  faUserGear,
} from '@fortawesome/free-solid-svg-icons'
import { MenuItemLink } from './MenuItemLink'
import { MenuItemButton } from './MenuItemButton'
import { useMutateUser } from '@/api/hooks/user/useMutateUser'
import { ConfirmModal } from '.'

export const Menu: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [active, setActive] = useState(false)
  const { logoutMutation } = useMutateUser()

  const handleMenu = () => {
    setActive((prev) => !prev)
  }

  // ログアウト処理
  const handleConfirmModal = () => {
    setIsOpen((prev) => !prev)
  }
  const onSubmitLogout = async () => {
    logoutMutation.mutate()
  }

  // メニューの開閉についての処理
  const insideRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = insideRef.current
    if (!el) return
    const handleClickOutside = (e: MouseEvent) => {
      // メニューの外側をクリックした際の処理
      if (!el?.contains(e.target as Node)) {
        setActive(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [insideRef])

  return (
    <>
      <div
        className={css({
          pos: 'relative',
          zIndex: 1000,
        })}
        ref={insideRef}
      >
        <m.div
          className={center({
            cursor: 'pointer',
          })}
          onClick={handleMenu}
        >
          <FontAwesomeIcon
            icon={active ? faClose : faBars}
            style={{ width: '32px', height: '32px', color: '0C4C97' }}
          />
        </m.div>
        <MenuItemLink
          title={'自分史を見る'}
          active={active}
          path={'/history'}
          icon={faMapLocationDot}
          yPos={100}
        />
        <MenuItemLink
          title={'自分史を分析する'}
          active={active}
          path={'/analysis'}
          icon={faMagnifyingGlassChart}
          yPos={200}
        />
        <MenuItemLink
          title={'ユーザ―情報'}
          active={active}
          path={'/user'}
          icon={faUserGear}
          yPos={300}
        />
        <MenuItemButton
          title={'ログアウト'}
          active={active}
          icon={faArrowRightFromBracket}
          yPos={400}
          onClick={handleConfirmModal}
        />
      </div>
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
