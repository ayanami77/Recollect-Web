import { FC, useEffect, useRef, useState } from 'react'
import { css } from '../../../styled-system/css'
import { hstack } from '../../../styled-system/patterns'
import { CharacteristicTag } from '@/components/common'
import { Period as TPeriod } from '@/api/models/card.model'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { HistoryCardMenu } from './HistoryCardMenu'
import { Session } from 'next-auth'
import Link from 'next/link'

type HistoryCardProps = {
  data: {
    id: string
    period: TPeriod
    title: string
    content: string
    tags: string[]
    createdAt: string
    updatedAt: string
  }
  user: Session['user']
}

export const HistoryCard: FC<HistoryCardProps> = (props) => {
  const { data, user } = props
  const [isOpen, setIsOpen] = useState(false)
  const [isShowButton, setIsShowButton] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isEditModalOpen) {
      if (ref.current && ref.current.offsetWidth < ref.current.scrollWidth) {
        setIsShowButton(true)
      } else {
        setIsShowButton(false)
      }
    }
  }, [isEditModalOpen])

  return (
    <div
      className={css({
        width: 'full',
        bg: 'white',
        px: '20px',
        py: '32px',
        shadow: 'md',
        rounded: '2xl',
        pos: 'relative',
        md: {
          px: '36px',
        },
      })}
    >
      <HistoryCardMenu
        data={data}
        user={user}
        setIsDetailOpen={setIsOpen}
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
      />
      <h3
        className={css({
          fontSize: 'xl',
          fontWeight: 'bold',
          md: {
            fontSize: '2xl',
          },
        })}
      >
        {data.title}
      </h3>
      <div className={css({ mt: '8px' })}>
        <div className={hstack({ gap: '24px' })}>
          {data.tags.length > 0 ? (
            <div className={hstack({ flexWrap: 'wrap' })}>
              {data.tags.map((tag, index) => (
                <CharacteristicTag key={index} name={tag} />
              ))}
            </div>
          ) : (
            <Link href={`/analysis?card_id=${data.id}`}>
              <span
                className={css({
                  color: 'lightGreen',
                  fontSize: 'sm',
                  md: { fontSize: 'md' },
                  _hover: {
                    textDecoration: 'underline',
                  },
                })}
              >
                分析をするとあなたの特性が表示されます
              </span>
            </Link>
          )}
        </div>
      </div>
      <div
        ref={ref}
        className={css({
          borderColor: 'gray',
          overflow: isOpen ? 'auto' : 'hidden',
          textOverflow: isOpen ? '' : 'ellipsis',
          whiteSpace: isOpen ? 'normal' : 'nowrap',
          fontSize: 'sm',
          color: 'dimGray',
          mt: '16px',
          transition: '.3s',
          md: {
            fontSize: 'md',
          },
        })}
      >
        {data.content}
      </div>
      {isShowButton && (
        <button
          className={hstack({
            mt: '12px',
            mx: 'auto',
            fontSize: 'md',
            color: 'black',
            cursor: 'pointer',
          })}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? '詳細をとじる' : '詳細をみる'}
          <FontAwesomeIcon
            icon={isOpen ? faChevronUp : faChevronDown}
            className={css({ w: '20px', h: '20px', color: 'black' })}
          />
        </button>
      )}
    </div>
  )
}
