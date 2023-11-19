import Image from 'next/image'
import Link from 'next/link'
import { Menu } from './Menu'
import { useRouter } from 'next/router'
import { hstack } from '../../../../styled-system/patterns'
import { css } from '../../../../styled-system/css'
import { NavigationMenu } from './NavigationMenu'

export const Header = () => {
  const router = useRouter()
  return (
    <header
      className={hstack({
        md: { h: '80px', p: '24px' },
        justify: 'space-between',
        h: '60px',
        p: '12px',
        pos: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
      })}
    >
      <div
        className={css({ md: { w: '200px', h: '80px' }, w: '160px', h: '60px', pos: 'relative' })}
      >
        <Image
          src={'/logo.png'}
          alt={'Recollectのロゴ'}
          fill
          className={css({ objectFit: 'contain' })}
        />
      </div>
      {['/history', '/analysis', '/user'].includes(router.pathname) && (
        <>
          {/* ナビゲーションメニュー */}
          <div className={css({ display: 'none', md: { display: 'block' } })}>
            <NavigationMenu />
          </div>
          {/* ハンバーガーメニュー */}
          <div className={css({ display: 'block', md: { display: 'none' } })}>
            <Menu />
          </div>
        </>
      )}
      {router.pathname === '/' && (
        <Link href={'/login'}>
          <span
            className={css({
              p: '8px',
              fontWeight: 'bold',
              fontSize: 'sm',
              border: 'solid',
              borderColor: 'skyBlue',
              color: 'skyBlue',
              rounded: 'lg',
              cursor: 'pointer',
              md: {
                fontSize: 'md',
                p: '12px',
              },
              _hover: {
                bg: 'skyBlue',
                color: 'white',
                borderColor: 'skyBlue',
                transition: 'all 0.15s',
              },
            })}
          >
            ログイン
          </span>
        </Link>
      )}
    </header>
  )
}
