import { Hero, SignUp } from '@/components/entrance'
import { Footer } from '@/components/common'
import { CommonMeta } from '@/components/common/meta'

export default function Home() {
  return (
    <>
      <CommonMeta title={'Recollect '} description={'Recollectというサービスの紹介ページです。'} />
      <div>
        <Hero />
        <SignUp />
        <Footer />
      </div>
    </>
  )
}
