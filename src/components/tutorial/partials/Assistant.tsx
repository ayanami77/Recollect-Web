import { FC } from 'react'
import Image from 'next/image'
import { css } from '../../../../styled-system/css'

type AssistantProps = {
  content: {
    cardPosition: number
  }
}

const qustion = [
  '周りにはどんな人がいた？',
  'どんなことをしてあそんでいた？',
  '夢中になったものは？',
  'どんなことに悩んでいた？',
  '熱中したことは？',
]

export const Assistant: FC<AssistantProps> = ({ content }) => {
  return (
    <div
      className={css({
        position: 'absolute',
        width: '400px',
        height: '140px',
        bottom: 0,
        right: '7px',
      })}
    >
      <div className={css({ position: 'relative', width: '100%', height: '100%' })}>
        <div
          className={css({
            position: 'absolute',
            display: 'flex',
            width: '270px',
            height: '150px',
            left: 0,
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
              fontSize: '17px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            })}
          >
            <p>{qustion[content.cardPosition]}</p>
          </div>
        </div>
        <div
          className={css({
            position: 'absolute',
            right: '20px',
            top: '50px',
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
