import { FC } from 'react'
import Image from 'next/image'
import { css } from '../../../../styled-system/css'
import { flex, vstack } from '../../../../styled-system/patterns'
type AssistantProps = {
  content: {
    cardPosition: number
  }
}
const questions = [
  '周りにはどんな人がいた？',
  'どんなことをしてあそんでいた？',
  '夢中になったものは？',
  'どんなことに悩んでいた？',
  '熱中したことは？',
]
export const Assistant: FC<AssistantProps> = ({ content }) => {
  return (
    <div
      className={flex({
        position: 'fixed',
        right: '20px',
        bottom: '20px',
        height: '180px',
      })}
    >
      <div
        className={css({
          width: '270px',
          height: '150px',
          background: 'url(/bubbles.svg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '270px',
        })}
      >
        <div
          className={css({
            width: '240px',
            height: '110px',
            p: '14px',
            fontSize: 'md',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          })}
        >
          <p>{questions[content.cardPosition]}</p>
        </div>
      </div>
      <div className={vstack({ justify: 'end', h: 'full' })}>
        <div
          className={css({
            backgroundColor: 'dullBlue',
            p: '20px',
            borderRadius: 'full',
          })}
        >
          <Image src={'/bookshelf.png'} alt={'マスコットキャラクター'} width={75} height={75} />
        </div>
      </div>
    </div>
  )
}
