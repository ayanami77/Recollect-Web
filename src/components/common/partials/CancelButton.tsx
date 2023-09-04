import { FC } from 'react'
import { css } from '../../../../styled-system/css'

type CancelButtonProps = {
  content: {
    handleOpen: () => void
  }
}
export const CancelButton: FC<CancelButtonProps> = ({ content }) => {
  const { handleOpen } = content
  return (
    <button
      className={css({
        cursor: 'pointer',
        border: 'none',
        backgroundColor: 'modestGray',
        color: 'white',
        fontSize: 'sm',
        fontWeight: 'bold',
        padding: '10px 20px',
        borderRadius: '10px',
      })}
      onClick={handleOpen}
    >
      キャンセル
    </button>
  )
}
