import { CommonMeta } from '@/components/common/meta'
import { ContentsWrapper } from '@/components/common'
import { SignupForm } from '@/components/auth/SignupForm'

const Signup = () => {
  return (
    <>
      <CommonMeta title={'Recollect - サインアップ'} description={'サインアップページです。'} />
      <ContentsWrapper>
        <SignupForm />
      </ContentsWrapper>
    </>
  )
}

export default Signup
