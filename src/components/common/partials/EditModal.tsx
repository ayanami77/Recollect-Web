import { FC } from 'react'
import { Backdrop } from './Backdrop'
import { css } from '../../../../styled-system/css'
import { CancelButton, Tag } from '.'
import { flex } from '../../../../styled-system/patterns'
type EditModalProps = {
  content: {
    handleOpen: () => void
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

export const EditModal: FC<EditModalProps> = ({ content }) => {
  const { handleOpen, data } = content

  // const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
  // 	content.setCardList((prev) => {
  // 	  prev[content.cardPostion].subTitle = e.target.value
  // 	  return [...prev]
  // 	})
  // }

  // const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
  // 	content.setCardList((prev) => {
  // 	  prev[content.cardPostion].content = e.target.value
  // 	  return [...prev]
  // 	})
  // }

  const createdAt = new Date(data.createdAt)
  const updatedAt = new Date(data.updatedAt)
  const createdAtString = `${createdAt.getFullYear()}/${
    createdAt.getMonth() + 1
  }/${createdAt.getDate()}`
  const updatedAtString = `${updatedAt.getFullYear()}/${
    updatedAt.getMonth() + 1
  }/${updatedAt.getDate()}`

  return (
    <Backdrop onClick={handleOpen}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={css({
          width: '600px',
          height: '500px',
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '38px',
          shadow: 'xl',
        })}
      >
        <div className={flex({})}>
          <label
            className={css({
              width: '350px',
              height: '24px',
              display: 'inline-block',
              mt: '7px',
              fontSize: '2xl',
            })}
          >
            <input
              type='text'
              id='title'
              // onChange={(e) => handleTitleChange(e)}
              value={content.data.title}
              placeholder='一言で'
              className={css({
                outline: 'none',
                fontWeight: 'bold',
              })}
            />
          </label>
          <div className={css({ color: 'GrayText', ml: 'auto', mt: '4px' })}>
            <div>作成日: {createdAtString}</div>
            <div>更新日: {updatedAtString}</div>
          </div>
        </div>

        <div>
          {data.tags.length > 0 &&
            data.tags.map((tag, index) => <Tag key={index} content={{ name: tag }} />)}
        </div>

        <textarea
          placeholder='どんなことをしていた？'
          // onChange={(e) => handleContentChange(e)}
          value={data.content}
          className={css({
            width: '100%',
            height: '340px',
            borderColor: 'gray',
            mt: '20px',
            outline: 'none',
            resize: 'none',
          })}
        ></textarea>
        <div className={flex()}>
          <CancelButton content={{ handleOpen }} />
        </div>
      </div>
    </Backdrop>
  )
}
