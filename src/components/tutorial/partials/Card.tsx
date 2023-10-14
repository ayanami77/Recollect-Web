import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react'
import { css } from '../../../../styled-system/css'
import { Period as TPeriod } from '@/api/models/card.model'

type Card = {
  period: TPeriod
  title: string
  content: string
}

type CardProps = {
  content: {
    cardPosition: number
    placeholderText: string
    setCardList: Dispatch<SetStateAction<Card[]>>
    cardList: Card[]
    isValidated: boolean
  }
}

export const Card: FC<CardProps> = ({ content }) => {
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    content.setCardList((prev) => {
      prev[content.cardPosition].title = e.target.value
      return [...prev]
    })
  }

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    content.setCardList((prev) => {
      prev[content.cardPosition].content = e.target.value
      return [...prev]
    })
  }

  return (
    <div
      className={css({
        width: '600px',
        minH: '370px',
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '38px',
        shadow: 'xl',
      })}
    >
      <label
        className={css({
          width: '350px',
          height: '24px',
          display: 'inline-block',
          mb: '15px',
          fontSize: '2xl',
        })}
      >
        <input
          type='text'
          id='title'
          onChange={(e) => handleTitleChange(e)}
          value={content.cardList[content.cardPosition].title}
          placeholder='一言で'
          className={css({
            borderBottom: '4px solid',
            borderColor: 'gray',
            outline: 'none',
            fontWeight: 'bold',
          })}
        />
        {content.isValidated && (
          <p className={css({ color: 'cinnabar', mt: '4px', fontSize: 'md' })}>
            タイトルは必須です。
          </p>
        )}
      </label>
      <textarea
        placeholder={`ヒント: ${content.placeholderText}`}
        onChange={(e) => handleContentChange(e)}
        value={content.cardList[content.cardPosition].content}
        className={css({
          width: '100%',
          height: '250px',
          borderColor: 'gray',
          mt: '20px',
          outline: 'none',
          resize: 'none',
        })}
      ></textarea>
    </div>
  )
}
