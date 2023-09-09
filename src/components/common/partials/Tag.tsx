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
        borderRadius: name === '今すぐ分析する' ? 'lg' : 'full',
        color: 'white',
        backgroundColor: name === '今すぐ分析する' ? 'dimBlue' : 'lightGreen',
        p: '2px 10px',
        fontSize: 'sm',
        fontWeight: 'bold',
      })}
    >
      {name}
    </div>
  )
}
