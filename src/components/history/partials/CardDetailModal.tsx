import { FC, useEffect, useState } from 'react'
import { css } from '../../../../styled-system/css'
import { flex, hstack } from '../../../../styled-system/patterns'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useMutateCard } from '@/api/hooks/card/useMutateCard'
import { Period as TPeriod } from '@/api/models'
import { ConfirmModal, Tag } from '@/components/common'
import { Backdrop } from '@/components/common/partials/Backdrop'
import { zodResolver } from '@hookform/resolvers/zod'
import { CardValidationSchema, TCardValidationSchema } from '@/libs/validations/cardValidation'
import { formatToDate } from '@/libs/dayjs'
import { controlScreenScroll } from '@/utils/controlScreenScroll'
import useStore from '@/store'

type CardDetailModalProps = {
  content: {
    handleOpen: () => void
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
}
export const CardDetailModal: FC<CardDetailModalProps> = ({ content }) => {
  const { handleOpen, data } = content
  const { updateCardMutation, deleteUserMutation } = useMutateCard()
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<TCardValidationSchema>({
    mode: 'onBlur',
    resolver: zodResolver(CardValidationSchema),
  })
  const watchedTitle = watch('title')
  const watchedContent = watch('content')

  const [isEditMode, setIsEditMode] = useState(false)
  const [isEdited, setIsEdited] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const store = useStore()

  const onSubmitUpdate: SubmitHandler<TCardValidationSchema> = async (d) => {
    try {
      const res = await updateCardMutation.mutateAsync({
        id: data.id,
        period: data.period,
        title: d.title,
        content: d.content,
      })
      if (res) {
        store.show('カードを更新しました', 'success')
        setTimeout(() => {
          store.hide()
        }, 2000)
      }
    } catch (error) {
      store.show('カードの更新に失敗しました', 'error')
      setTimeout(() => {
        store.hide()
      }, 2000)
    }
    setIsEditMode(false)
  }

  const handleDeleteModalOpen = () => setIsDeleteModalOpen((prev) => !prev)

  const handleDeleteModalProceed = async (id: string) => {
    try {
      await deleteUserMutation.mutateAsync({
        id: id,
      })
      store.show('カードを削除しました', 'success')
      setTimeout(() => {
        store.hide()
      }, 2000)
    } catch (error) {
      store.show('カードの削除に失敗しました', 'error')
      setTimeout(() => {
        store.hide()
      }, 2000)
    }
    setIsConfirmModalOpen(false)
    controlScreenScroll(true)
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
            minH: '540px',
            bg: 'white',
            rounded: '3xl',
            padding: '32px',
            shadow: 'xl',
          })}
        >
          <form onSubmit={handleSubmit(onSubmitUpdate)}>
            <div className={flex({})}>
              <input
                type='text'
                id='title'
                defaultValue={content.data.title}
                placeholder='一言で'
                readOnly={!isEditMode}
                className={css({
                  width: '360px',
                  height: '40px',
                  outline: 'none',
                  fontWeight: 'bold',
                  backgroundColor: isEditMode ? 'slate.50' : 'transparent',
                  rounded: 'md',
                  p: '8px',
                  fontSize: '2xl',
                  borderWidth: '1px',
                  borderColor: isEditMode ? 'slate.500' : 'transparent',
                  _focus: {
                    borderWidth: isEditMode ? '2px' : '1px',
                    borderColor: isEditMode ? 'blue.400' : 'transparent',
                  },
                })}
                {...register('title')}
              />
              <div
                className={hstack({
                  px: '10px',
                  py: '5px',
                  gap: '16px',
                  ml: 'auto',
                })}
              >
                <button
                  type='button'
                  className={css({ cursor: isEditMode ? '' : 'pointer' })}
                  onClick={isEditMode ? () => false : handleEditMode}
                  title='編集'
                >
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    style={{ width: '20px', color: isEditMode ? '#F5F5F5' : '#0c4c97' }}
                  />
                </button>
                <button
                  type='button'
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
            {errors.title?.message && (
              <p className={css({ color: 'cinnabar', mt: '4px' })}>{errors.title.message}</p>
            )}
            <div className={hstack({ color: 'GrayText', mt: '8px', px: '8px', gap: '24px' })}>
              <span>作成: {formatToDate(content.data.createdAt)}</span>
              <span>更新: {formatToDate(content.data.updatedAt)}</span>
            </div>
            {!isEditMode && (
              <div className={css({ mt: '10px', px: '8px' })}>
                {data.tags.length > 0 ? (
                  <div className={hstack({})}>
                    {data.tags.map((tag, index) => (
                      <Tag key={index} content={{ name: tag }} />
                    ))}
                  </div>
                ) : (
                  <span className={css({ color: 'lightGreen' })}>
                    分析するとあなたの特性が表示されます。
                  </span>
                )}
              </div>
            )}
            <textarea
              placeholder='どんなことをしていた？'
              defaultValue={data.content}
              readOnly={!isEditMode}
              className={css({
                width: '100%',
                minH: '340px',
                p: '8px',
                mt: '8px',
                backgroundColor: isEditMode ? 'slate.50' : 'transparent',
                borderWidth: '1px',
                borderColor: isEditMode ? 'slate.500' : 'transparent',
                outline: 'none',
                resize: 'none',
                rounded: 'md',
                _focus: {
                  borderWidth: isEditMode ? '2px' : '1px',
                  borderColor: isEditMode ? 'blue.400' : 'transparent',
                },
              })}
              {...register('content')}
            />
            {errors.content?.message && (
              <p className={css({ color: 'cinnabar' })}>{errors.content.message}</p>
            )}
            {isEditMode && (
              <div className={flex({ justifyContent: 'end', gap: '10px' })}>
                <button
                  type='button'
                  className={hstack({
                    bg: 'slate.200',
                    px: '18px',
                    py: '14px',
                    fontWeight: 'bold',
                    rounded: 'xl',
                    cursor: 'pointer',
                    _hover: { bg: 'slate.300', transition: 'all 0.15s' },
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
                    _disabled: {
                      opacity: 0.8,
                      cursor: 'default',
                    },
                  })}
                  disabled={!isEdited}
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
            message: `本当にこの自分史を削除しますか？`,
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
