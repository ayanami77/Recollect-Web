import Link from 'next/link'
import { FC, useState } from 'react'
import { css } from '../../../../styled-system/css'
import { center } from '../../../../styled-system/patterns'
import { m } from 'framer-motion'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faCompass,
  faMagnifyingGlassChart,
  faMapLocationDot,
} from '@fortawesome/free-solid-svg-icons'

export const Menu: FC = () => {
  const [active, setActive] = useState(false)
  const handleMenu = () => {
    setActive((prev) => !prev)
  }
  return (
    <div
      className={css({
        pos: 'fixed',
        right: '70px',
        bottom: '70px',
      })}
    >
      <div
        className={css({
          pos: 'relative',
          w: '80px',
          h: '80px',
        })}
      >
        <m.div
          className={center({
            pos: 'absolute',
            zIndex: 1000,
            w: '80px',
            h: '80px',
            bg: 'dimBlue',
            rounded: 'full',
            shadow: 'xl',
            cursor: 'pointer',
          })}
          whileTap={{ scale: 0.9 }}
          onClick={handleMenu}
        >
          <FontAwesomeIcon
            icon={faCompass}
            style={{ width: '42px', height: '42px', color: 'white' }}
          />
        </m.div>
        <Link href={'/analysis'} title='自分史を分析する'>
          <m.li
            className={center({
              pos: 'absolute',
              top: 1,
              left: 1,
              w: '72px',
              h: '72px',
              bg: 'white',
              rounded: 'full',
              listStyle: 'none',
              shadow: 'xl',
            })}
            whileTap={{ scale: 0.9 }}
            animate={
              active
                ? {
                    x: -0,
                    y: -140,
                  }
                : {
                    x: 0,
                    y: 0,
                  }
            }
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlassChart}
              style={{ width: '32px', height: '32px', color: '#0C4C97' }}
            />
          </m.li>
        </Link>
        <Link href={'/history'} title='自分史を見る'>
          <m.li
            className={center({
              pos: 'absolute',
              top: 1,
              left: 1,
              w: '72px',
              h: '72px',
              bg: 'white',
              rounded: 'full',
              listStyle: 'none',
              shadow: 'xl',
            })}
            whileTap={{ scale: 0.9 }}
            animate={
              active
                ? {
                    x: -100,
                    y: -100,
                  }
                : {
                    x: 0,
                    y: 0,
                  }
            }
          >
            <FontAwesomeIcon
              icon={faMapLocationDot}
              style={{ width: '32px', height: '32px', color: '#0C4C97' }}
            />
          </m.li>
        </Link>
        <Link href={'/'} title='ログアウト'>
          <m.li
            className={center({
              pos: 'absolute',
              top: 1,
              left: 1,
              w: '72px',
              h: '72px',
              bg: 'white',
              rounded: 'full',
              listStyle: 'none',
              shadow: 'xl',
            })}
            whileTap={{ scale: 0.9 }}
            animate={
              active
                ? {
                    x: -140,
                  }
                : {
                    x: 0,
                  }
            }
          >
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              style={{ width: '32px', height: '32px', color: '#0C4C97' }}
            />
          </m.li>
        </Link>
      </div>
    </div>
  )
}
