import { css } from '../../../../styled-system/css'
import { hstack } from '../../../../styled-system/patterns'

export const Header = () => {
  return (
    <header className={hstack({ height: '80px', padding: '24px', backgroundColor: 'white' })}>
      <div
        className={css({
          color: 'black',
          fontSize: '3xl',
          fontWeight: 'bold',
        })}
      >
        <span className={css({ color: 'cinnabar' })}>Re</span>collect
      </div>
    </header>
  )
}
