import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react'
import { css } from '../../../../styled-system/css'
import { Period as TPeriod } from '@/api/models'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'

type Card = {
  period: TPeriod
  subTitle: string
  content: string
}
type CardProps = {
  content: {
    cardPosition: number
    placeholderText: string
    setCardList: Dispatch<SetStateAction<Card[]>>
    cardList: Card[]
  }
}

export const Card: FC<CardProps> = ({ content }) => {
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   reset,
  //   formState: { errors },
  // } = useForm({
  //   mode: 'onBlur',
  //   resolver: zodResolver(CardValidationSchema as any),
  // })

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    content.setCardList((prev) => {
      prev[content.cardPosition].subTitle = e.target.value
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
          value={content.cardList[content.cardPosition].subTitle}
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
