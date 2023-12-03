import { hstack } from '../../../../../styled-system/patterns'
import {
  faArrowRightFromBracket,
  faMagnifyingGlassChart,
  faMapLocationDot,
  faUserGear,
} from '@fortawesome/free-solid-svg-icons'
import { NavigationMenuItemLink } from './NavigationMenuItemLink'
import { NavigationMenuItemButton } from './NavigationMenuItemButton'
import { FC } from 'react'

type NavigationMenuProps = {
  onClickFunc: () => void
}

export const NavigationMenu: FC<NavigationMenuProps> = (props) => {
  const { onClickFunc } = props
  return (
    <nav>
      <ul className={hstack({ gap: '32px' })}>
        <NavigationMenuItemLink title={'自分史をみる'} link={'/history'} icon={faMapLocationDot} />
        <NavigationMenuItemLink
          title={'自分史を分析する'}
          link={'/analysis'}
          icon={faMagnifyingGlassChart}
        />
        <NavigationMenuItemLink title={'ユーザ―情報'} link={'/user'} icon={faUserGear} />
        <NavigationMenuItemButton
          title={'ログアウト'}
          icon={faArrowRightFromBracket}
          onClickFunc={onClickFunc}
        />
      </ul>
    </nav>
  )
}
