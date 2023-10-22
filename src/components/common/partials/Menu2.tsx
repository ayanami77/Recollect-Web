import { FC, useEffect, useRef, useState } from 'react'
import { css } from '../../../../styled-system/css'
import { center } from '../../../../styled-system/patterns'
import { m } from 'framer-motion'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faClose,
  faMagnifyingGlassChart,
  faMapLocationDot,
  faUserGear,
} from '@fortawesome/free-solid-svg-icons'
import { MenuItem } from './MenuItem'

export const Menu2: FC = () => {
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
        <MenuItem
          title={'自分史を見る'}
          active={active}
          path={'/history'}
          icon={faMapLocationDot}
          yPos={100}
        />
        <MenuItem
          title={'自分史を分析する'}
          active={active}
          path={'/analysis'}
          icon={faMagnifyingGlassChart}
          yPos={200}
        />
        <MenuItem
          title={'ユーザ―情報'}
          active={active}
          path={'/user'}
          icon={faUserGear}
          yPos={300}
        />
      </div>
    </>
  )
}
