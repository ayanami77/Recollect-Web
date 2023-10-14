import { FC } from 'react'
import { css } from '../../../../styled-system/css'

type TagProps = {
  content: {
    name: string
  }
}

export const Tag: FC<TagProps> = ({ content }) => {
  const { name } = content

  return (
    <div
      className={css({
        display: 'inline-block',
        borderRadius: 'full',
        color: 'white',
        backgroundColor: 'lightGreen',
        p: '2px 10px',
        fontSize: 'sm',
        fontWeight: 'bold',
      })}
    >
      {name}
    </div>
  )
}
