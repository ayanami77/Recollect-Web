import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { hstack } from '../../../../styled-system/patterns'
import { css } from '../../../../styled-system/css'
import { Menu2 } from './Menu2'

export const Header = () => {
  const router = useRouter()
  return (
    <header
      className={hstack({
        md: { height: '80px', padding: '24px' },
        height: '60px',
        padding: '12px',
        backgroundColor: 'white',
        justify: 'space-between',
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
      {['/history', '/analysis', '/user'].includes(router.pathname) && <Menu2 />}
      {router.pathname === '/' && (
        <Link href={'/login'}>
          <span
            className={css({
              fontWeight: 'bold',
              fontSize: 'sm',
              border: 'solid',
              borderColor: 'skyBlue',
              color: 'skyBlue',
              p: '8px',
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
