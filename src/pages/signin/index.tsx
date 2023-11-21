import { CommonMeta } from '@/components/common/meta'
import { ContentsWrapper } from '@/components/common'
import { signIn } from 'next-auth/react'

const Signup = () => {
  return (
    <>
      <CommonMeta title={'Recollect - サインイン'} description={'サインインページです。'} />
      <ContentsWrapper>
        <div>
          <button onClick={() => signIn()}>Googleでサインインする</button>
        </div>
      </ContentsWrapper>
    </>
  )
}

export default Signup
