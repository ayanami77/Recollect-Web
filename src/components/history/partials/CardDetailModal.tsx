import { FC, useEffect, useState } from 'react'
import { css } from '../../../../styled-system/css'
import { flex, hstack } from '../../../../styled-system/patterns'
import { SubmitHandler, useForm } from 'react-hook-form'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useMutationCard } from '@/api/hooks/card/useMutateCard'
import { Period as TPeriod } from '@/api/models'
import { ConfirmModal, Tag } from '@/components/common'
import { Backdrop } from '@/components/common/partials/Backdrop'

type CardDetailModalProps = {
  content: {
    handleOpen: () => void
    data: {
      id: number
      period: TPeriod
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

export const CardDetailModal: FC<CardDetailModalProps> = ({ content }) => {
  const { updateCardMutation, deleteUserMutation } = useMutationCard()
  // todo: zodでバリデーション
  const { handleOpen, data } = content
  const {
    register,
    handleSubmit,
    watch,
    reset,
    // formState: { errors },
  } = useForm<Inputs>()

  const onSubmitUpdate: SubmitHandler<Inputs> = (d) => {
    if (isEdited) {
      updateCardMutation.mutate({
        id: data.id,
        period: data.period,
        title: d.title,
        content: d.content,
      })
    }
    setIsEditMode(false)
  }

  const updatedAt = new Date(data.updatedAt)

  const updatedAtString = `${updatedAt.getFullYear()}/${
    updatedAt.getMonth() + 1
  }/${updatedAt.getDate()}`

  const [isEditMode, setIsEditMode] = useState(false)
  const [isEdited, setIsEdited] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const watchedTitle = watch('title')
  const watchedContent = watch('content')

  const handleDeleteModalOpen = () => setIsDeleteModalOpen((prev) => !prev)
  const handleDeleteModalProceed = async (id: number) => {
    deleteUserMutation.mutate({
      id: id,
    })
    setIsConfirmModalOpen(false)
  }

  const handleConfirmModalCancel = () => {
    setIsConfirmModalOpen(false)
  }

  const handleConfirmModalProceed = () => {
    setIsEditMode(false)
    setIsConfirmModalOpen(false)

    reset({
      title: data.title,
      content: data.content,
    })
  }

  const handleEditMode = () => {
    if (isEdited) {
      setIsConfirmModalOpen(true)
    } else {
      setIsEditMode((prev) => !prev)
    }
  }

  useEffect(() => {
    if (watch('title') !== data.title || watch('content') !== data.content) {
      setIsEdited(true)
    } else {
      setIsEdited(false)
    }
  }, [watchedTitle, watchedContent, data.title, data.content, watch])

  return (
    <>
      <Backdrop onClick={isEditMode ? () => false : handleOpen}>
        <div
          onClick={(e) => e.stopPropagation()}
          className={css({
            width: '600px',
            height: '510px',
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '38px',
            shadow: 'xl',
          })}
        >
          <form onSubmit={handleSubmit(onSubmitUpdate)}>
            <div className={flex({})}>
              <label
                className={css({
                  width: '350px',
                  height: '24px',
                  display: 'inline-block',
                  fontSize: '2xl',
                })}
              >
                <input
                  type='text'
                  id='title'
                  defaultValue={content.data.title}
                  required
                  placeholder='一言で'
                  {...register('title', {
                    required: true,
                    maxLength: { value: 20, message: '最大20文字です' },
                  })}
                  className={css({
                    outline: 'none',
                    fontWeight: 'bold',
                    backgroundColor: 'slate.100',
                    rounded: 'md',
                    px: '8px',
                  })}
                  readOnly={!isEditMode}
                  style={{
                    backgroundColor: isEditMode ? '#f1f5f9' : 'white',
                    borderColor: isEditMode ? '#0000009c' : 'none',
                    borderWidth: isEditMode ? '2px' : '0',
                  }}
                />
              </label>
              <div
                className={hstack({
                  px: '10px',
                  py: '5px',
                  gap: '16px',
                  ml: 'auto',
                })}
              >
                <div
                  className={css({ cursor: isEditMode ? '' : 'pointer' })}
                  onClick={isEditMode ? () => false : handleEditMode}
                  title='編集'
                >
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    style={{ width: '20px', color: isEditMode ? '#F5F5F5' : '#0c4c97' }}
                  />
                </div>
                <button
                  className={css({ cursor: isEditMode ? '' : 'pointer' })}
                  onClick={isEditMode ? () => false : handleDeleteModalOpen}
                  title='削除'
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ width: '20px', color: isEditMode ? '#F5F5F5' : '#FD4444' }}
                  />
                </button>
              </div>
            </div>
            <div className={css({ color: 'GrayText', ml: 'auto', mt: '8px', px: '8px' })}>
              <span>更新日: {updatedAtString}</span>
            </div>
            <div className={css({ mt: '10px', px: '8px' })}>
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
              readOnly={!isEditMode}
              style={{
                backgroundColor: isEditMode ? '#f1f5f9' : 'white',
                borderColor: isEditMode ? '#0000009c' : 'none',
                borderWidth: isEditMode ? '2px' : '0',
              }}
              className={css({
                width: '100%',
                height: '300px',
                mt: '8px',
                outline: 'none',
                resize: 'none',
                padding: '8px',
                rounded: 'md',
              })}
            ></textarea>
            {isEditMode && (
              <div className={flex({ justifyContent: 'end', gap: '10px' })}>
                <button
                  type='button'
                  className={hstack({
                    bg: 'slate.100',
                    px: '18px',
                    py: '14px',
                    rounded: 'xl',
                    cursor: 'pointer',
                    _hover: { bg: 'slate.200', transition: 'all 0.15s' },
                  })}
                  onClick={handleEditMode}
                >
                  キャンセル
                </button>
                <button
                  type='submit'
                  className={css({
                    border: 'none',
                    backgroundColor: 'dimBlue',
                    fontWeight: 'bold',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    color: 'white',
                    cursor: 'pointer',
                  })}
                >
                  保存
                </button>
              </div>
            )}
          </form>
        </div>
      </Backdrop>
      {isDeleteModalOpen && (
        <ConfirmModal
          content={{
            onCancel: handleDeleteModalOpen,
            onConfirm: () => handleDeleteModalProceed(content.data.id),
            cancelMessage: 'キャンセル',
            confirmMessage: '削除',
            message: `本当にこのカードを削除しますか？`,
          }}
        />
      )}
      {isConfirmModalOpen && (
        <ConfirmModal
          content={{
            onCancel: handleConfirmModalCancel,
            onConfirm: handleConfirmModalProceed,
            cancelMessage: 'キャンセル',
            confirmMessage: '保存せずに終了',
            message: `編集内容が保存されていません。保存せずに終了しますか？`,
          }}
        />
      )}
    </>
  )
}
