import { css } from '../../../styled-system/css'
import { FC } from 'react'
import { hstack } from '../../../styled-system/patterns'

type UserLoggedInUserProps = {
  userId: string
}
export const UserLoggedInUser: FC<UserLoggedInUserProps> = (props) => {
  const { userId } = props

  return (
    <div>
      <h2
        className={css({
          mb: '16px',
          fontSize: '2xl',
          fontWeight: 'bold',
        })}
      >
        ログイン中のユーザー
      </h2>
      <ul>
        <li className={hstack({})}>
          <span className={css({ fontWeight: 'bold' })}>ユーザーID</span>
          <span>{userId}</span>
        </li>
      </ul>
    </div>
  )
}
