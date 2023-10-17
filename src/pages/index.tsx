import { Hero, SignUp } from '@/components/entrance'
import { CommonMeta } from '@/components/common'
import { ContentsWrapper } from '@/components/common'

const Entrance = () => {
  return (
    <>
      <CommonMeta title={'Recollect'} description={'Recollectというサービスの紹介ページです。'} />
      <ContentsWrapper>
        <Hero />
        <SignUp />
      </ContentsWrapper>
    </>
  )
}

export default Entrance
