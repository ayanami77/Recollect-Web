import { CommonMeta, Footer } from '@/components/common'
import { ContentsWrapper } from '@/components/common'
import Image from 'next/image'
import { vstack } from '../../styled-system/patterns'
import { css } from '../../styled-system/css'
import Link from 'next/link'

const Entrance = () => {
  return (
    <>
      <CommonMeta title={'Recollect'} description={'Recollectを知り、はじめてみる。'} />
      <ContentsWrapper>
        <section className={vstack({ gap: '48px', justifyContent: 'center', mt: '40px' })}>
          <div className={vstack({ gap: '16px', alignItems: 'start' })}>
            <h1 className={css({ fontSize: '6xl', fontWeight: 'bold', md: { fontSize: '72px' } })}>
              <span className={css({ color: 'cinnabar' })}>Re</span>collect
            </h1>
            <p
              className={css({
                color: 'dimGray',
                fontSize: 'xl',
                fontWeight: 'bold',
                md: { fontSize: '2xl' },
              })}
            >
              過去の自分を拾い集めて、
              <br />
              未来の自分をかたち創る。
              <br />
              就活生のための自分史作成サービスです。
            </p>
          </div>
          <Image src={'/img/hero.png'} alt={'ヒーローイメージ'} width={320} height={320} priority />
        </section>
        <section className={vstack({ w: 'fit', mx: 'auto', mt: '24px', gap: '24px' })}>
          <Link href={'/signin'}>
            <span
              className={css({
                fontWeight: 'bold',
                fontSize: 'xl',
                border: 'solid',
                borderColor: 'skyBlue',
                color: 'skyBlue',
                p: '12px',
                rounded: '2xl',
                cursor: 'pointer',
                md: {
                  fontSize: '2xl',
                },
                _hover: {
                  bg: 'skyBlue',
                  color: 'white',
                  borderColor: 'skyBlue',
                  transition: 'all 0.15s',
                },
              })}
            >
              始めてみる
            </span>
          </Link>
        </section>
        <Footer />
      </ContentsWrapper>
    </>
  )
}

export default Entrance
