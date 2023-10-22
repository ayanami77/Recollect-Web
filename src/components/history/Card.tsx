import { FC, useState } from 'react'
import { css } from '../../../styled-system/css'
import { hstack } from '../../../styled-system/patterns'
import { FeatureTag } from '@/components/common'
import { Period as TPeriod } from '@/api/models/card.model'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { CardMenu } from './CardMenu'

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
  const [isExpanded, setIsExpanded] = useState(false)

  const handleExpand = () => {
    setIsExpanded((prev) => !prev)
  }

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
      <CardMenu data={data} />
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
                <FeatureTag key={index} name={tag} />
              ))}
            </div>
          ) : (
            <p className={css({ color: 'dimBlue', fontSize: 'sm', md: { fontSize: 'md' } })}>
              分析をするとあなたの特性が表示されます。
            </p>
          )}
        </div>
      </div>
      <div
        className={css({
          borderColor: 'gray',
          overflow: isExpanded ? 'auto' : 'hidden',
          textOverflow: isExpanded ? '' : 'ellipsis',
          whiteSpace: isExpanded ? 'normal' : 'nowrap',
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
        onClick={handleExpand}
      >
        {isExpanded ? '詳細をとじる' : '詳細をみる'}
        <FontAwesomeIcon
          icon={isExpanded ? faChevronUp : faChevronDown}
          className={css({ w: '20px', h: '20px', color: 'black' })}
        />
      </button>
    </div>
  )
}
