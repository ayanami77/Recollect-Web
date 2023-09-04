import { CommonMeta } from '@/components/common/meta'
import { SignUpForm } from '@/components/auth'

export default function Signup() {
  return (
    <>
      <CommonMeta title={'Recollect - サインアップ'} description={'サインアップページです。'} />
      <SignUpForm />
    </>
  )
}
