import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react'
import { css } from '../../../styled-system/css'
import { Period as TPeriod } from '@/api/models/card.model'

type TutorialCard = {
  period: TPeriod
  title: string
  content: string
}

type TutorialCardProps = {
  content: {
    cardPosition: number
    placeholderText: string
    setCardList: Dispatch<SetStateAction<TutorialCard[]>>
    cardList: TutorialCard[]
    isValidated: boolean
  }
}

export const TutorialCard: FC<TutorialCardProps> = ({ content }) => {
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
        w: '640px',
        h: '440px',
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '38px',
        shadow: 'xl',
        rounded: '2xl',
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
            borderBottom: '2px solid',
            borderColor: 'gray',
            outline: 'none',
            _focus: {
              borderColor: 'blue.500',
            },
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
          height: '270px',
          p: '8px',
          mt: '20px',
          borderWidth: '2px',
          borderColor: 'gray',
          outline: 'none',
          resize: 'none',
          rounded: 'md',
          _focus: {
            borderColor: 'blue.500',
          },
        })}
      ></textarea>
    </div>
  )
}
