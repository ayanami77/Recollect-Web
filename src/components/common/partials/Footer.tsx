import { css } from '../../../../styled-system/css'
import { hstack } from '../../../../styled-system/patterns'

export const Footer = () => {
  return (
    <footer className={hstack({ justifyContent: 'center', height: '60px', mt: '64px' })}>
      <small className={css({ color: 'black' })}>&copy; 2023 - チーム名</small>
    </footer>
  )
}
