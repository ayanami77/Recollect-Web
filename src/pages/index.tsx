import { Hero, Signin } from '@/components/entrance'
import { CommonMeta } from '@/components/common'
import { ContentsWrapper } from '@/components/common'

const Entrance = () => {
  return (
    <>
      <CommonMeta title={'Recollect'} description={'Recollectというサービスの紹介ページです。'} />
      <ContentsWrapper>
        <Hero />
        <Signin />
      </ContentsWrapper>
    </>
  )
}

export default Entrance
