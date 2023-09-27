import { LoginForm } from '@/components/auth'
import { ContentsWrapper } from '@/components/common'
import { CommonMeta } from '@/components/common/meta'

const Login = () => {
  return (
    <>
      <CommonMeta title={'Recollect - ログイン'} description={'ログインページです。'} />
      <ContentsWrapper>
        <LoginForm />
      </ContentsWrapper>
    </>
  )
}

export default Login
