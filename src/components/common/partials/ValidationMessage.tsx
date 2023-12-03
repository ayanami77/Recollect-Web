import { FC } from 'react'
import { css } from '../../../../styled-system/css'

type ValidationMessageProps = {
  message: string
}
export const ValidationMessage: FC<ValidationMessageProps> = ({ message }) => {
  return <p className={css({ color: 'cinnabar', fontSize: 'sm' })}>{message}</p>
}
