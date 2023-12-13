import { User as TUser } from '@/api/models/user.model'
import { FC } from 'react'
import { UserLoggedInUser } from './UserLoggedInUser'
import { hstack } from '../../../styled-system/patterns'
import { FadeInWrapper } from '../common'

type UserContainerProps = {
  userInfo: Pick<TUser, 'userId'>
}
export const UserContainer: FC<UserContainerProps> = (props) => {
  const { userInfo } = props
  return (
    <FadeInWrapper>
      <div
        className={hstack({
          w: 'full',
          gap: '32px',
          mt: '40px',
        })}
      >
        <UserLoggedInUser userId={userInfo.userId} />
      </div>
    </FadeInWrapper>
  )
}
