import { css } from '../../../../styled-system/css'
import { hstack } from '../../../../styled-system/patterns'
import { vstack } from '../../../../styled-system/patterns'

export const Hero = () => {
  return (
    <div className={hstack({ alignItems: 'end' })}>
      <div className={vstack({ gap: '16px', alignItems: 'start' })}>
        <h2 className={css({ fontSize: '72px', fontWeight: 'bold' })}>
          <span className={css({ color: 'fontRed' })}>Re</span>collect
        </h2>
        <p className={css({ color: 'fontDefault', fontSize: '2xl', fontWeight: 'bold' })}>
          過去の自分を拾い集めて、
          <br />
          未来の自分をかたち創る。
          <br />
          就活生のための自分史作成サービスです。
        </p>
      </div>
      <div className={css({ backgroundColor: 'fontRed', width: '300px', height: '200px' })}></div>
    </div>
  )
}
