import { FC } from 'react'
import { css } from '../../../styled-system/css'
import { flex, hstack } from '../../../styled-system/patterns'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutateCard } from '@/api/hooks/card/useMutateCard'
import { Period as TPeriod } from '@/api/models/card.model'
import { Backdrop } from '@/components/common/partials/Backdrop'
import { zodResolver } from '@hookform/resolvers/zod'
import { CardValidationSchema, TCardValidationSchema } from '@/libs/validations/cardValidation'
import useStore from '@/store'

type CardCreateModalProps = {
  content: {
    handleOpen: () => void
    data: {
      period: TPeriod
    }
  }
}
export const CardCreateModal: FC<CardCreateModalProps> = ({ content }) => {
  const { handleOpen, data } = content
  const { createCardMutation } = useMutateCard()
  const store = useStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCardValidationSchema>({
    mode: 'onBlur',
    resolver: zodResolver(CardValidationSchema),
  })

  const onSubmitCreate: SubmitHandler<TCardValidationSchema> = async (d) => {
    try {
      const res = await createCardMutation.mutateAsync({
        period: data.period,
        title: d.title,
        content: d.content,
      })
      if (res) {
        store.show('カードを作成しました', 'success')
        setTimeout(() => {
          store.hide()
        }, 2000)
      }
    } catch (error) {
      store.show('カードの作成に失敗しました', 'error')
      setTimeout(() => {
        store.hide()
      }, 2000)
    }
    handleOpen()
  }

  return (
    <Backdrop>
      <div
        onClick={(e) => e.stopPropagation()}
        className={css({
          width: '560px',
          height: '600px',
          bg: 'white',
          rounded: '3xl',
          px: '32px',
          pt: '24px',
          pb: '12px'
        })}
      >
        <h2 className={css({ fontSize: '3xl', fontWeight: 'bold' })}>
          自分史を作成
        </h2>
        <form onSubmit={handleSubmit(onSubmitCreate)}>
          <div>
            <div className={hstack({ justify: 'space-between' })}>
              <label
                htmlFor="title"
                className={css({ fontSize: 'md' })}>
                タイトル
              </label>
              <input
                type='text'
                id='title'
                className={css({
                  width: '320px',
                  height: '36px',
                  outline: 'none',
                  rounded: 'md',
                  p: '8px',
                  fontSize: 'xl',
                  borderWidth: '1px',
                  borderColor: 'slate.500',
                  _focus: {
                    borderWidth: '2px',
                    borderColor: 'blue.400',
                  },
                })}
                {...register('title')}
              />
            </div>
            {errors.title?.message && (
              <p className={css({ color: 'cinnabar', mt: '4px' })}>{errors.title.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor=""
              className={css({ fontSize: 'md' })}
            >
              内容
            </label>
            <textarea
              placeholder='どんなことをしていた？'
              className={css({
                width: '100%',
                minH: '320px',
                p: '8px',
                mt: '8px',
                borderWidth: '1px',
                borderColor: 'slate.500',
                outline: 'none',
                resize: 'none',
                rounded: 'md',
                _focus: {
                  borderWidth: '2px',
                  borderColor: 'blue.400',
                },
              })}
              {...register('content')}
            />
            {errors.content?.message && (
              <p className={css({ color: 'cinnabar' })}>{errors.content.message}</p>
            )}
          </div>
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
              onClick={handleOpen}
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
            >
              作成
            </button>
          </div>
        </form>
      </div>
    </Backdrop>
  )
}
