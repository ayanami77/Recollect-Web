import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { hstack, vstack } from '../../../../styled-system/patterns'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { css } from '../../../../styled-system/css'
import { FC } from 'react'
import { m } from 'framer-motion'
import { Backdrop } from './Backdrop'
import { Tag } from '@/components/views'

const fadeIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.1,
    },
  },
  exit: {
    opacity: 0,
  },
}

// TODO: 必要なpropsは後で追加
type DetailModalProps = {
  content: {
    handleClose: () => void
  }
}
export const DetailModal: FC<DetailModalProps> = (props) => {
  const { content } = props
  return (
    <Backdrop onClick={content.handleClose}>
      <m.div
        className={vstack({
          bg: 'white',
          p: '20px',
          rounded: '3xl',
          alignItems: 'start',
          w: '640px',
          h: '720px',
          shadow: '2xl',
        })}
        onClick={(e) => e.stopPropagation()}
        variants={fadeIn}
      >
        <div className={vstack({ w: 'full', alignItems: 'end' })}>
          <button
            className={css({
              cursor: 'pointer',
            })}
            onClick={content.handleClose}
          >
            <FontAwesomeIcon icon={faXmark} style={{ width: '26px', height: '26px' }} />
          </button>
        </div>
        <div className={css({ w: 'full', px: '24px' })}>
          <div className={hstack({ w: 'fuil', alignItems: 'start', justify: 'space-between' })}>
            <div className={vstack({ alignItems: 'start' })}>
              <h2 className={css({ fontSize: '3xl', fontWeight: 'bold' })}>高校生</h2>
              <div className={hstack({})}>
                <Tag
                  content={{
                    name: '責任感',
                  }}
                />
              </div>
            </div>
            <div className={css({ color: 'dimGray' })}>
              <p>作成日 2023-11-23</p>
              <p>更新日 2023-11-23</p>
            </div>
          </div>
          <p className={css({ fontSize: 'xl', fontWeight: 'medium', mt: '14px' })}>
            文系でも化学部が楽しかった話！
          </p>
          <div className={css({ w: 'full', h: '4px', bg: 'lightgrey' })} />
          <div
            className={vstack({
              w: 'full',
              h: '180px',
              alignItems: 'start',
              justifyContent: 'space-between',
            })}
          >
            <div className={css({ mt: '12px', color: 'dimGray' })}>
              <p>
                ・毎週、教科書で出てくるような有名な実験から面白い実験まで色々なことをしていました。やはり化学実験ではあるので、部員としっかりと協力して取り組んでいました。色々な事象を目の当たりにするたびにわくわくを沢山感じていました。さらに、文化祭準備期間では自分たちで何をするか考え、じっくりと時間をかけて楽しく取り組んでいました。
              </p>
            </div>
          </div>
        </div>
      </m.div>
    </Backdrop>
  )
}
