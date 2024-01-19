import { FC } from 'react'
import { css } from '../../../styled-system/css'
import { flex, hstack } from '../../../styled-system/patterns'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutateCard } from '@/api/hooks/card/useMutateCard'
import { Period as TPeriod } from '@/api/models/card.model'
import { zodResolver } from '@hookform/resolvers/zod'
import { CardValidationSchema, TCardValidationSchema } from '@/libs/validations/cardValidation'
import { useToastStore } from '@/store/useToastStore'
import { HistoryCardModalBase } from './base/HistoryCardModalBase'
import { ValidationMessage } from '../common/partials/ValidationMessage'

type HistoryCardCreateModalProps = {
  handleModal: () => void
  data: {
    period: TPeriod
  }
}

export const HistoryCardCreateModal: FC<HistoryCardCreateModalProps> = (props) => {
  const { handleModal, data } = props
  const { createCardMutation } = useMutateCard()
  const toastStore = useToastStore()
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
        cardData: {
          period: data.period,
          title: d.title,
          content: d.content,
        },
      })
      if (res) {
        toastStore.show('自分史を作成しました', 'success')
        toastStore.hide()
      }
    } catch (error) {
      toastStore.show('自分史を作成できませんでした', 'error')
      toastStore.hide()
    } finally {
      handleModal()
    }
  }

  return (
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
        自分史を作成する
      </h2>
      <form onSubmit={handleSubmit(onSubmitCreate)} className={css({ mt: '12px' })}>
        <div className={flex({ direction: 'column', gap: '12px' })}>
          <div>
            <div className={hstack({ justify: 'space-between' })}>
              <label
                htmlFor='title'
                className={css({
                  fontSize: 'md',
                  fontWeight: 'bold',
                  minW: '72px',
                  _after: {
                    content: '"*"',
                    color: 'cinnabar',
                    ml: '2px',
                  },
                })}
              >
                タイトル
              </label>
              <input
                type='text'
                id='title'
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
              内容(最大1000文字)
            </label>
            <textarea
              id='content'
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
              fontWeight: 'bold',
              color: 'black',
              rounded: 'lg',
              cursor: 'pointer',
              _hover: { bg: 'slate.300', transition: 'all 0.15s' },
            })}
            onClick={handleModal}
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
              transition: 'background .15s',
              _hover: {
                bg: 'hovered_dimBlue',
              },
            })}
          >
            作成する
          </button>
        </div>
      </form>
    </HistoryCardModalBase>
  )
}
