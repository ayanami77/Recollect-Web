import Link from 'next/link'
import { FC, useState } from 'react'
import { css } from '../../../../styled-system/css'
import { center } from '../../../../styled-system/patterns'
import { motion } from 'framer-motion'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export const Menu: FC = () => {
  const [active, setActive] = useState(false)
  return (
    <motion.div
      className={css({ pos: 'fixed', right: '100px', bottom: '80px', cursor: 'pointer' })}
      whileTap={{ scale: 0.9 }}
    >
      <div className={`menu ${active && 'active'}`}>
        <div
          className={center({
            pos: 'absolute',
            zIndex: 1000,
            w: '80px',
            h: '80px',
            bg: 'dimBlue',
            rounded: 'full',
            shadow: 'xl',
            transform: '1.25s',
          })}
          onClick={() => setActive(!active)}
        >
          <FontAwesomeIcon
            icon={faBars}
            style={{ width: '30px', height: '30px', color: 'white' }}
          />
        </div>
        <li>
          <Link href={'/'}>A</Link>
        </li>
        <li>
          <Link href={'/'}>B</Link>
        </li>
        <li>
          <Link href={'/'}>C</Link>
        </li>
      </div>
    </motion.div>
  )
}
