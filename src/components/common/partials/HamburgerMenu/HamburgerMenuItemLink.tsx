import { m } from 'framer-motion'
import { FC } from 'react'
import { css } from '../../../../../styled-system/css'
import { hstack } from '../../../../../styled-system/patterns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useRouter } from 'next/router'

type HamburgerMenuItemLinkProps = {
  title: string
  path: string
  active: boolean
  yPos: number
  icon: IconDefinition
}
export const HamburgerMenuItemLink: FC<HamburgerMenuItemLinkProps> = (props) => {
  const router = useRouter()
  const { title, path, active, icon, yPos } = props

  return (
    <li
      className={css({
        listStyle: 'none',
      })}
    >
      <Link href={path}>
        <m.div
          className={hstack({
            pos: 'absolute',
            top: 1,
            right: 0,
            w: '280px',
            bg: router.pathname === path ? 'white' : 'lightGray',
            p: '20px',
            shadow: '2xl',
            rounded: 'xl',
            gap: '20px',
            visibility: active ? 'visible' : 'hidden',
            md: {
              p: '20px',
            },
          })}
          whileTap={{ scale: 0.9 }}
          animate={
            active
              ? {
                  x: 0,
                  y: yPos,
                }
              : {
                  x: 0,
                  y: 0,
                }
          }
        >
          <FontAwesomeIcon
            icon={icon}
            style={{ width: '32px', height: '32px', color: '#0C4C97' }}
          />
          <span className={css({ fontWeight: 'bold', fontSize: 'xl', color: 'black ' })}>
            {title}
          </span>
        </m.div>
      </Link>
    </li>
  )
}
