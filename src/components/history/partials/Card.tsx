import { FC, useState } from 'react'
import { css } from '../../../../styled-system/css'
import { flex, hstack } from '../../../../styled-system/patterns'
import { m } from 'framer-motion'
import Link from 'next/link'
import { Tag } from '@/components/common'
import { Period as TPeriod } from '@/api/models/card.model'
import { CardDetailModal } from './CardDetailModal'
import { controlScreenScroll } from '@/utils/controlScreenScroll'

type CardProps = {
  data: {
    id: string
    period: TPeriod
    title: string
    content: string
    tags: string[]
    createdAt: string
    updatedAt: string
  }
}

export const Card: FC<CardProps> = (props) => {
  const { data } = props
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => {
    controlScreenScroll(isOpen)
    setIsOpen((prev) => !prev)
  }

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
        <div className={flex({ alignItems: 'center', justify: 'space-between' })}>
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
          <button
            className={css({
              color: 'dimgray',
              cursor: 'pointer',
              _hover: { textDecoration: 'underline' },
            })}
            onClick={handleOpen}
          >
            詳細
          </button>
        </div>
        <div className={css({ mt: '10px' })}>
          <div className={hstack({ gap: '24px' })}>
            {data.tags.length > 0 ? (
              <div className={hstack({})}>
                {data.tags.map((tag, index) => (
                  <Tag key={index} content={{ name: tag }} />
                ))}
              </div>
            ) : (
              <Link href={`/analysis?card_id=${data.id}`}>
                <Tag content={{ name: '今すぐ分析する' }} />
              </Link>
            )}
          </div>
        </div>
        <div
          className={css({
            width: '650px',
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
      {isOpen && <CardDetailModal content={{ handleOpen, data }} />}
    </>
  )
}
