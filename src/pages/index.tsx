import { EntranceHero, EntranceSigninButton } from '@/components/entrance'
import { CommonMeta } from '@/components/common'
import { ContentsWrapper } from '@/components/common'

const Entrance = () => {
  return (
    <>
      <CommonMeta title={'Recollect'} description={'Recollectとは'} />
      <ContentsWrapper>
        <EntranceHero />
        <EntranceSigninButton />
      </ContentsWrapper>
    </>
  )
}

export default Entrance
