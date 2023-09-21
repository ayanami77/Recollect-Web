import { FC } from 'react'
import { css } from '../../../../styled-system/css'
import { flex, hstack } from '../../../../styled-system/patterns'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutateCard } from '@/api/hooks/card/useMutateCard'
import { Period as TPeriod } from '@/api/models'
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
    <>
      <Backdrop onClick={() => false}>
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
          <form onSubmit={handleSubmit(onSubmitCreate)}>
            <div className={flex({})}>
              <input
                type='text'
                id='title'
                placeholder='一言で'
                className={css({
                  width: '360px',
                  height: '40px',
                  outline: 'none',
                  fontWeight: 'bold',
                  backgroundColor: 'slate.50',
                  rounded: 'md',
                  p: '8px',
                  fontSize: '2xl',
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
            <div className={hstack({ color: 'GrayText', mt: '8px', px: '8px', gap: '24px' })}>
              <span>時期: {data.period}</span>
            </div>
            <textarea
              placeholder='どんなことをしていた？'
              className={css({
                width: '100%',
                minH: '340px',
                p: '8px',
                mt: '8px',
                backgroundColor: 'slate.50',
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
    </>
  )
}
