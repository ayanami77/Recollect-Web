import { FC } from 'react'
import { Backdrop } from './Backdrop'
import { css } from '../../../../styled-system/css'
import { CancelButton, Tag } from '.'
import { flex } from '../../../../styled-system/patterns'
import { SubmitHandler, useForm } from 'react-hook-form'
import Link from 'next/link'
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
type Inputs = {
  title: string
  content: string
}

export const EditModal: FC<EditModalProps> = ({ content }) => {
  // todo: zodでバリデーション
  const { handleOpen, data } = content
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  const createdAt = new Date(data.createdAt)
  const updatedAt = new Date(data.updatedAt)
  const createdAtString = `${createdAt.getFullYear()}/${
    createdAt.getMonth() + 1
  }/${createdAt.getDate()}`
  const updatedAtString = `${updatedAt.getFullYear()}/${
    updatedAt.getMonth() + 1
  }/${updatedAt.getDate()}`

  return (
    <Backdrop onClick={() => false}>
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
        <form onSubmit={handleSubmit(onSubmit)}>
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
                defaultValue={content.data.title}
                required
                {...register('title', {
                  required: true,
                  maxLength: { value: 20, message: '最大20文字です' },
                })}
                placeholder='一言で'
                className={css({
                  outline: 'none',
                  fontWeight: 'bold',
                  backgroundColor: 'slate.100',
                  padding: '5px',
                  borderColor: 'dimgray',
                  borderWidth: '1px',
                  rounded: 'md',
                })}
              />
            </label>
            <div className={css({ color: 'GrayText', ml: 'auto', mt: '4px' })}>
              <div>作成日: {createdAtString}</div>
              <div>更新日: {updatedAtString}</div>
            </div>
          </div>

          <div className={css({ mt: '10px' })}>
            {data.tags.length > 0 ? (
              data.tags.map((tag, index) => <Tag key={index} content={{ name: tag }} />)
            ) : (
              <Link href={'/analysis'}>
                <Tag content={{ name: '今すぐ分析する' }} />
              </Link>
            )}
          </div>
          <textarea
            placeholder='どんなことをしていた？'
            defaultValue={data.content}
            required
            {...register('content', { required: true })}
            className={css({
              width: '100%',
              height: '300px',
              mt: '5px',
              outline: 'none',
              resize: 'none',
              backgroundColor: 'slate.100',
              padding: '5px',
              borderColor: 'dimgray',
              borderWidth: '1px',
              rounded: 'md',
            })}
          ></textarea>
          <div className={flex({ justifyContent: 'end', gap: '10px' })}>
            <CancelButton content={{ handleOpen }} />
            <label
              className={css({
                cursor: 'pointer',
                border: 'none',
                backgroundColor: 'dimBlue',
                fontSize: 'sm',
                fontWeight: 'bold',
                padding: '10px 20px',
                borderRadius: '10px',
              })}
            >
              <input
                type='submit'
                value='保存'
                className={css({
                  color: 'white',
                  cursor: 'pointer',
                  padding: '5px',
                })}
              />
            </label>
          </div>
        </form>
      </div>
    </Backdrop>
  )
}
