import { FC } from 'react'
import { css } from '../../../../styled-system/css'

type FeatureTagProps = {
  name: string
}

export const FeatureTag: FC<FeatureTagProps> = (props) => {
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
