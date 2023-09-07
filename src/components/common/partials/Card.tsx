import { FC, useState } from 'react'
import { css } from '../../../../styled-system/css'
import { flex, hstack } from '../../../../styled-system/patterns'
import { EditModal, Tag } from '.'
import { m } from 'framer-motion'
import Link from 'next/link'

type CardProps = {
  contents: {
    data: {
      id: number
      period: string
      title: string
      content: string
      tags: string[]
      createdAt: string
      updatedAt: string
    }
  }
}

export const Card: FC<CardProps> = ({ contents }) => {
  const { data } = contents
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => setIsOpen((prev) => !prev)

  return (
    <>
      <m.div
        className={css({
          width: 'full',
          height: '162px',
          bg: 'white',
          borderRadius: '10px',
          paddingX: '38px',
          paddingY: '20px',
          shadow: 'md',
        })}
        whileHover={{ scale: 1.03 }}
      >
        <div className={flex({ alignItems: 'center', gap: '32px' })}>
          <div
            className={css({
              height: '24px',
              display: 'inline-block',
              mb: '10px',
              fontSize: '2xl',
              fontWeight: 'bold',
            })}
          >
            {data.title}
          </div>
        </div>
        <div className={css({ mt: '10px' })}>
          <div className={hstack({ gap: '24px' })}>
            {data.tags.length > 0 ? (
              data.tags.map((tag, index) => <Tag key={index} content={{ name: tag }} />)
            ) : (
              <Link href={'/analysis'}>
                <Tag content={{ name: '今すぐ分析する' }} />
              </Link>
            )}
            <button className={css({ color: 'dimgray', cursor: 'pointer' })} onClick={handleOpen}>
              詳細
            </button>
          </div>
        </div>
        <div
          className={css({
            width: '400px',
            borderColor: 'gray',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            color: 'dimGray',
            mt: '16px',
          })}
        >
          {data.content}
        </div>
      </m.div>
      {isOpen && <EditModal content={{ handleOpen, data }} />}
    </>
  )
}
