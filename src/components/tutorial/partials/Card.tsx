import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react'
import { css } from '../../../../styled-system/css'

type Period = '幼少期' | '小学生' | '中学生' | '高校生' | '大学生'
type Card = {
  period: Period
  subTitle: string
  content: string
}
type CardProps = {
  content: {
    cardPostion: number
    setCardList: Dispatch<SetStateAction<Card[]>>
    cardList: Card[]
  }
}
export const Card: FC<CardProps> = ({ content }) => {
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    content.setCardList((prev) => {
      prev[content.cardPostion].subTitle = e.target.value
      return [...prev]
    })
  }

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    content.setCardList((prev) => {
      prev[content.cardPostion].content = e.target.value
      return [...prev]
    })
  }

  return (
    <div
      className={css({
        width: '600px',
        height: '370px',
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
          value={content.cardList[content.cardPostion].subTitle}
          placeholder='一言で'
          className={css({
            borderBottom: '4px solid',
            borderColor: 'gray',
            outline: 'none',
            fontWeight: 'bold',
          })}
        />
      </label>
      <textarea
        placeholder='どんなことをしていた？'
        onChange={(e) => handleContentChange(e)}
        value={content.cardList[content.cardPostion].content}
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
