import { Hero, SignUp } from '@/components/entrance'
import { Footer, CommonMeta } from '@/components/common'
import { ContentsWrapper } from '@/components/common/utils'

const Entrance = () => {
  return (
    <>
      <CommonMeta title={'Recollect'} description={'Recollectというサービスの紹介ページです。'} />
      <ContentsWrapper>
        <Hero />
        <SignUp />
        <Footer />
      </ContentsWrapper>
    </>
  )
}

export default Entrance
