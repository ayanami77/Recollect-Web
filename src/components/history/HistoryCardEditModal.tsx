import { FC, useEffect, useState } from 'react'
import { css } from '../../../styled-system/css'
import { flex, hstack } from '../../../styled-system/patterns'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutateCard } from '@/api/hooks/card/useMutateCard'
import { Period as TPeriod } from '@/api/models/card.model'
import { ConfirmModal } from '@/components/common'
import { zodResolver } from '@hookform/resolvers/zod'
import { CardValidationSchema, TCardValidationSchema } from '@/libs/validations/cardValidation'
import { useToastStore } from '@/store/useToastStore'
import { Session } from 'next-auth'
import { HistoryCardModalBase } from './base/HistoryCardModalBase'
import { ValidationMessage } from '../common/partials/ValidationMessage'

type HistoryCardEditModalProps = {
  handleModal: () => void
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

export const HistoryCardEditModal: FC<HistoryCardEditModalProps> = (props) => {
  const { handleModal, data, user } = props
  const { updateCardMutation } = useMutateCard()
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

  const [isEdited, setIsEdited] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  const toastStore = useToastStore()

  const onSubmitUpdate: SubmitHandler<TCardValidationSchema> = async (d) => {
    try {
      const res = await updateCardMutation.mutateAsync({
        cardData: {
          id: data.id,
          period: data.period,
          title: d.title,
          content: d.content,
        },
        accessToken: user.access_token || '',
      })
      if (res) {
        toastStore.show('自分史を更新しました', 'success')
        toastStore.hide()
      }
    } catch (error) {
      toastStore.show('自分史を更新できませんでした', 'error')
      toastStore.hide()
    } finally {
      handleModal()
    }
  }

  const handleEditMode = () => {
    if (isEdited) {
      setIsConfirmModalOpen(true)
    } else {
      handleModal()
    }
  }

  const handleConfirmModalCancel = () => {
    setIsConfirmModalOpen(false)
  }

  const handleConfirmModalProceed = () => {
    setIsConfirmModalOpen(false)

    reset({
      title: data.title,
      content: data.content,
    })
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
      <HistoryCardModalBase>
        <h2
          className={css({
            fontSize: '2xl',
            fontWeight: 'bold',
            md: {
              fontSize: '3xl',
            },
          })}
        >
          自分史を編集する
        </h2>
        <form onSubmit={handleSubmit(onSubmitUpdate)} className={css({ mt: '12px' })}>
          <div className={flex({ direction: 'column', gap: '12px' })}>
            <div>
              <div className={hstack({ justify: 'space-between' })}>
                <label
                  htmlFor='title'
                  className={css({ fontSize: 'md', fontWeight: 'bold', minW: '72px' })}
                >
                  タイトル
                </label>
                <input
                  type='text'
                  id='title'
                  defaultValue={data.title}
                  className={css({
                    maxW: '320px',
                    w: 'full',
                    height: '36px',
                    outline: 'none',
                    rounded: 'md',
                    p: '8px',
                    fontSize: 'md',
                    borderWidth: '2px',
                    borderColor: 'slate.400',
                    _focus: {
                      borderColor: 'blue.500',
                    },
                    md: { fontSize: 'xl' },
                  })}
                  {...register('title')}
                />
              </div>

              {errors.title?.message && (
                <p className={css({ color: 'cinnabar', fontSize: 'sm' })}>{errors.title.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor='content'
                className={css({ fontSize: 'md', fontWeight: 'bold', minW: '60px' })}
              >
                内容
              </label>
              <textarea
                id='content'
                defaultValue={data.content}
                className={css({
                  width: '100%',
                  minH: '320px',
                  p: '8px',
                  mt: '8px',
                  borderWidth: '2px',
                  borderColor: 'slate.400',
                  outline: 'none',
                  resize: 'none',
                  rounded: 'md',
                  _focus: {
                    borderColor: 'blue.500',
                  },
                })}
                {...register('content')}
              />
              {errors.content?.message && <ValidationMessage message={errors.content.message} />}
            </div>
          </div>
          <div className={flex({ justifyContent: 'end', gap: '10px' })}>
            <button
              type='button'
              className={hstack({
                bg: 'slate.200',
                px: '18px',
                py: '14px',
                color: 'black',
                fontWeight: 'bold',
                rounded: 'lg',
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
                color: 'white',
                rounded: 'lg',
                cursor: 'pointer',
                _disabled: {
                  opacity: 0.8,
                  cursor: 'default',
                },
              })}
              disabled={!isEdited}
            >
              保存する
            </button>
          </div>
        </form>
      </HistoryCardModalBase>
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
