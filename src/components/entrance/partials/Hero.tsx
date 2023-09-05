import Image from 'next/image'
import { css } from '../../../../styled-system/css'
import { hstack } from '../../../../styled-system/patterns'
import { vstack } from '../../../../styled-system/patterns'

export const Hero = () => {
  return (
    <div className={hstack({ gap: '108px', justifyContent: 'center', mt: '40px' })}>
      <div className={vstack({ gap: '16px', alignItems: 'start' })}>
        <h2 className={css({ fontSize: '72px', fontWeight: 'bold' })}>
          <span className={css({ color: 'cinnabar' })}>Re</span>collect
        </h2>
        <p className={css({ color: 'dimGray', fontSize: '2xl', fontWeight: 'bold' })}>
          過去の自分を拾い集めて、
          <br />
          未来の自分をかたち創る。
          <br />
          就活生のための自分史作成サービスです。
        </p>
      </div>
      <Image src={'/hero.png'} alt={'ヒーローイメージ'} width={400} height={400} />
    </div>
  )
}
