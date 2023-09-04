import { css } from '../../../../../styled-system/css'

export const Card = () => {
  return (
    <div
      className={css({
        minW: '400px',
        h: '240px',
        p: '24px',
        bg: 'white',
        rounded: '2xl',
        shadow: 'xl',
        cursor: 'pointer',
      })}
    >
      <h2 className={css({ fontSize: '2xl', fontWeight: 'bold' })}>タイトルです</h2>
      <p className={css({ fontSize: 'xl', mt: '8px' })}>xxxxxxxxxxxxxxxxxxxxxxxxx</p>
    </div>
  )
}
