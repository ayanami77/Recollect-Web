import { FC, useState } from 'react'
import { css } from '../../../styled-system/css'
import { hstack } from '../../../styled-system/patterns'
import { CharacteristicTag } from '@/components/common'
import { Period as TPeriod } from '@/api/models/card.model'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { HistoryCardMenu } from './HistoryCardMenu'
import { Session } from 'next-auth'

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
      <HistoryCardMenu data={data} user={user} />
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
            <p className={css({ color: 'lightGreen', fontSize: 'sm', md: { fontSize: 'md' } })}>
              分析をするとあなたの特性が表示されます
            </p>
          )}
        </div>
      </div>
      <div
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
    </div>
  )
}
