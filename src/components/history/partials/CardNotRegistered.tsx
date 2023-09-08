import { vstack } from '../../../../styled-system/patterns'

export const CardNotRegistered = () => {
  return (
    <p
      className={vstack({
        w: 'full',
        fontWeight: 'bold',
        bg: 'white',
        p: '4px',
        rounded: '2xl',
      })}
    >
      自分史が登録されていません
    </p>
  )
}
