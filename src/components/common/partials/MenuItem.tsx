import { m } from 'framer-motion'
import { FC } from 'react'
import { css } from '../../../../styled-system/css'
import { hstack } from '../../../../styled-system/patterns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useRouter } from 'next/router'

type MenuItemProps = {
  title: string
  path: string
  active: boolean
  yPos: number
  icon: IconDefinition
}
export const MenuItem: FC<MenuItemProps> = (props) => {
  const router = useRouter()
  const { title, path, active, icon, yPos } = props

  return (
    <Link href={path}>
      <m.li
        className={hstack({
          pos: 'absolute',
          top: 1,
          right: 0,
          w: '280px',
          bg: router.pathname === path ? 'gray' : 'white',
          p: '20px',
          listStyle: 'none',
          shadow: 'xl',
          rounded: 'xl',
          gap: '20px',
          visibility: active ? 'visible' : 'hidden',
          _hover: {
            bg: 'gray',
            rounded: 'xl',
          },
          md: {
            p: '20px',
          },
        })}
        whileTap={{ scale: 0.9 }}
        animate={
          active
            ? {
                x: -0,
                y: yPos,
              }
            : {
                x: 0,
                y: 0,
              }
        }
      >
        <FontAwesomeIcon icon={icon} style={{ width: '32px', height: '32px', color: '#0C4C97' }} />
        <span className={css({ fontWeight: 'bold', fontSize: 'xl', color: 'black ' })}>
          {title}
        </span>
      </m.li>
    </Link>
  )
}
