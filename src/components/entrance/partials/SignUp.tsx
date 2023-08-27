import { css } from '../../../../styled-system/css'

export const SignUp = () => {
  return (
    <div className={css({ textAlign: 'center', mt: '96px' })}>
      <button
        className={css({
          border: 'solid',
          p: '12px',
          rounded: 'xl',
          fontSize: '2xl',
          color: 'skyBlue',
          cursor: 'pointer',
          _hover: { bg: 'skyBlue', color: 'white', transition: 'all 0.15s' },
        })}
      >
        始めてみる
      </button>
    </div>
  )
}
