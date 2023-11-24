import Image from 'next/image'
import { css } from '../../../styled-system/css'
import { vstack } from '../../../styled-system/patterns'

export const EntranceHero = () => {
  return (
    <div className={vstack({ gap: '48px', justifyContent: 'center', mt: '40px' })}>
      <div className={vstack({ gap: '16px', alignItems: 'start' })}>
        <h2 className={css({ fontSize: '6xl', fontWeight: 'bold', md: { fontSize: '72px' } })}>
          <span className={css({ color: 'cinnabar' })}>Re</span>collect
        </h2>
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
      <Image src={'/hero.png'} alt={'ヒーローイメージ'} width={320} height={320} priority />
    </div>
  )
}
