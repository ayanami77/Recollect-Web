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
import { Session } from 'next-auth'

type CardCreateModalProps = {
  content: {
    handleOpen: () => void
    data: {
      period: TPeriod
    }
  }
  user: Session['user']
}
export const CardCreateModal: FC<CardCreateModalProps> = ({ content, user }) => {
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
        cardData: {
          period: data.period,
          title: d.title,
          content: d.content,
        },
        accessToken: user.access_token || '',
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
          bg: 'white',
          rounded: '3xl',
          px: '20px',
          py: '24px',
          md: {
            px: '32px',
          },
        })}
      >
        <h2
          className={css({
            fontSize: '2xl',
            fontWeight: 'bold',
            md: {
              fontSize: '3xl',
            },
          })}
        >
          自分史を追加する
        </h2>
        <form onSubmit={handleSubmit(onSubmitCreate)} className={css({ mt: '8px' })}>
          <div className={flex({ direction: 'column', gap: '6px' })}>
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
                <p className={css({ color: 'cinnabar', mt: '4px' })}>{errors.title.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor=''
                className={css({ fontSize: 'md', fontWeight: 'bold', minW: '60px' })}
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
              {errors.content?.message && (
                <p className={css({ color: 'cinnabar' })}>{errors.content.message}</p>
              )}
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
