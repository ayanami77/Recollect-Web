import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { hstack } from '../../../../../styled-system/patterns'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

type NavigationMenuItemLinkProps = {
  title: string
  link: string
  icon: IconDefinition
}
export const NavigationMenuItemLink: FC<NavigationMenuItemLinkProps> = (props) => {
  const { title, link, icon } = props
  const router = useRouter()
  const isPathname = router.pathname === link

  return (
    <li>
      <Link href={link}>
        <span
          className={hstack({
            fontWeight: 'bold',
            p: '12px',
            rounded: 'xl',
            bg: isPathname ? 'white' : 'transparent',
            shadow: isPathname ? 'lg' : 'none',
            transition: 'background .15s',
            _hover: isPathname
              ? {}
              : {
                  bg: 'gray',
                },
          })}
        >
          <FontAwesomeIcon
            icon={icon}
            style={{ width: '24px', height: '24px', color: '#0C4C97' }}
          />
          {title}
        </span>
      </Link>
    </li>
  )
}
