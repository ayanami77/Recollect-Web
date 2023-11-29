import { FC } from 'react'
import { css } from '../../../../styled-system/css'

type CharacteristicTagProps = {
  name: string
}

export const CharacteristicTag: FC<CharacteristicTagProps> = (props) => {
  const { name } = props

  return (
    <div
      className={css({
        display: 'inline-block',
        rounded: 'lg',
        color: 'white',
        backgroundColor: 'lightGreen',
        p: '2px 10px',
        fontSize: 'xs',
        md: {
          fontSize: 'sm',
        },
      })}
    >
      {name}
    </div>
  )
}
