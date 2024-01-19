import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react'
import { css } from '../../../styled-system/css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEdit,
  faEllipsis,
  faMagnifyingGlassChart,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { HistoryCardMenuItem } from './HistoryCardMenuItem'
import { useRouter } from 'next/router'
import { ConfirmModal } from '../common'
import { useMutateCard } from '@/api/hooks/card/useMutateCard'
import { useToastStore } from '@/store/useToastStore'
import { controlScreenScroll } from '@/utils/controlScreenScroll'
import { HistoryCardEditModal } from './HistoryCardEditModal'
import { Period as TPeriod } from '@/api/models/card.model'

type HistoryCardMenuProps = {
  data: {
    id: string
    period: TPeriod
    title: string
    content: string
    tags: string[]
    createdAt: string
    updatedAt: string
  }
  isEditModalOpen: boolean
  setIsDetailOpen: Dispatch<SetStateAction<boolean>>
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>
}
export const HistoryCardMenu: FC<HistoryCardMenuProps> = (props) => {
  const { data, isEditModalOpen, setIsDetailOpen, setIsEditModalOpen } = props
  const router = useRouter()
  const toastStore = useToastStore()
  const [isOpen, setIsOpen] = useState(false)

  // 分析ページへ飛ばす処理
  const navigateToAnalysis = () => {
    router.push(`/analysis?card_id=${data.id}`)
  }

  // カード編集処理
  const handleEditModal = () => {
    setIsEditModalOpen((prev) => !prev)
    controlScreenScroll(isEditModalOpen)
  }

  // カード削除処理
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const { deleteUserMutation } = useMutateCard()
  const handleConfirmModal = () => setIsConfirmModalOpen((prev) => !prev)
  const deleteCardByCardId = async (cardId: string) => {
    try {
      await deleteUserMutation.mutateAsync({
        cardData: { id: cardId },
      })
      toastStore.show('自分史を削除しました', 'success')
      toastStore.hide()
    } catch (error) {
      toastStore.show('自分史を削除できませんでした', 'error')
      toastStore.hide()
    }
    setIsConfirmModalOpen(false)
    controlScreenScroll(true)
  }

  // メニューの開閉についての処理
  const insideRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = insideRef.current
    if (!el) return
    const handleClickOutside = (e: MouseEvent) => {
      // メニューの外側をクリックした際の処理
      if (!el?.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [insideRef])

  return (
    <div ref={insideRef}>
      <button
        className={css({ pos: 'absolute', top: '16px', right: '24px' })}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FontAwesomeIcon
          icon={faEllipsis}
          className={css({
            w: '26px',
            h: '26px',
            color: 'dimBlue',
            cursor: 'pointer',
            md: { w: '32px', h: '32px' },
          })}
        />
      </button>

      {isOpen && (
        <ul
          className={css({
            w: '160px',
            bg: 'white',
            pos: 'absolute',
            top: '48px',
            right: '24px',
            rounded: 'xl',
            shadow: '2xl',
            borderWidth: '2px',
            borderColor: 'gray',
            md: {
              w: '172px',
            },
          })}
          onClick={(e) => e.stopPropagation()}
        >
          <HistoryCardMenuItem
            icon={faMagnifyingGlassChart}
            color='#0C4C97'
            title={'分析する'}
            onClickFunc={navigateToAnalysis}
          />
          <div className={css({ w: 'full', h: '2px', bg: 'gray' })} />
          <HistoryCardMenuItem
            icon={faEdit}
            color='green'
            title={'編集する'}
            onClickFunc={handleEditModal}
          />
          <div className={css({ w: 'full', h: '2px', bg: 'gray' })} />
          <HistoryCardMenuItem
            icon={faTrash}
            color='red'
            title={'削除する'}
            onClickFunc={handleConfirmModal}
          />
        </ul>
      )}
      {isEditModalOpen && (
        <HistoryCardEditModal
          handleModal={handleEditModal}
          data={data}
          setIsDetailOpen={setIsDetailOpen}
        />
      )}
      {isConfirmModalOpen && (
        <ConfirmModal
          content={{
            onCancel: handleConfirmModal,
            onConfirm: () => deleteCardByCardId(data.id),
            cancelMessage: 'キャンセル',
            confirmMessage: '削除する',
            message: `本当にこの自分史を削除しますか？`,
          }}
        />
      )}
    </div>
  )
}
