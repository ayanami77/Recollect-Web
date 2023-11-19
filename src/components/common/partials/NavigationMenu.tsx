import { hstack } from '../../../../styled-system/patterns'
import {
  faMagnifyingGlassChart,
  faMapLocationDot,
  faUserGear,
} from '@fortawesome/free-solid-svg-icons'
import { NavigationMenuItem } from './NavigationMenuItem'

export const NavigationMenu = () => {
  return (
    <nav>
      <ul className={hstack({ gap: '32px' })}>
        <li>
          <NavigationMenuItem title={'自分史をみる'} link={'/history'} icon={faMapLocationDot} />
        </li>
        <li>
          <NavigationMenuItem
            title={'自分史を分析する'}
            link={'/analysis'}
            icon={faMagnifyingGlassChart}
          />
        </li>
        <li>
          <NavigationMenuItem title={'ユーザ―情報'} link={'/user'} icon={faUserGear} />
        </li>
      </ul>
    </nav>
  )
}
