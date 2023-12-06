import { FC, useEffect, useRef, useState } from 'react'
import { css } from '../../../../../styled-system/css'
import { center } from '../../../../../styled-system/patterns'
import { m } from 'framer-motion'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faClose,
  faMagnifyingGlassChart,
  faMapLocationDot,
  faRightFromBracket,
  faUserGear,
} from '@fortawesome/free-solid-svg-icons'
import { HamburgerMenuItemLink } from './HamburgerMenuItemLink'
import { HamburgerMenuItemButton } from './HamburgerMenuItemButton'

type HamburgerMenuProps = {
  onClickFunc: () => void
}
export const HamburgerMenu: FC<HamburgerMenuProps> = (props) => {
  const { onClickFunc } = props
  const [active, setActive] = useState(false)

  const handleMenu = () => {
    setActive((prev) => !prev)
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
      </div>
      <HamburgerMenuItemLink
        title={'自分史を見る'}
        active={active}
        path={'/history'}
        icon={faMapLocationDot}
        yPos={90}
      />
      <HamburgerMenuItemLink
        title={'自分史を分析する'}
        active={active}
        path={'/analysis'}
        icon={faMagnifyingGlassChart}
        yPos={180}
      />
      <HamburgerMenuItemLink
        title={'ユーザー情報'}
        active={active}
        path={'/user'}
        icon={faUserGear}
        yPos={270}
      />
      <HamburgerMenuItemButton
        title={'ログアウト'}
        active={active}
        icon={faRightFromBracket}
        yPos={360}
        onClickFunc={onClickFunc}
      />
    </>
  )
}
