import { LoginForm } from '@/components/auth'
import { CommonMeta } from '@/components/common/meta'

export default function Login() {
  return (
    <>
      <CommonMeta title={'Recollect - ログイン'} description={'ログインページです。'} />
      <LoginForm />
    </>
  )
}
