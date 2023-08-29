import { FC } from 'react'
import { css } from '../../../../../styled-system/css'

type TagProps = {
  content: {
    name: string
  }
}
export const Tag: FC<TagProps> = () => {
  return <div className={css({ px: '12px', py: '4px', bg: 'blue.200', rounded: 'xl' })}>Tag</div>
}
