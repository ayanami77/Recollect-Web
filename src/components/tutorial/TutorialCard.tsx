import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react'
import { css } from '../../../styled-system/css'
import { Period as TPeriod } from '@/api/models/card.model'
import { flex, hstack, vstack } from '../../../styled-system/patterns'
import { TutorialPCSwitchButton } from '.'
import { TutorialMobileSwitchButton } from './TutorialMobileSwitchButton'
import { toPeriodStringFromNumber } from '@/utils/toPeriodStringFromNumber'
import { ValidationMessage } from '../common/partials/ValidationMessage'

type TutorialCard = {
  period: TPeriod
  title: string
  content: string
}

type TutorialCardProps = {
  cardPosition: number
  placeholderText: string
  cardList: TutorialCard[]
  isValidated: boolean
  handleNext: () => void
  handlePrev: () => void
  setCardList: Dispatch<SetStateAction<TutorialCard[]>>
}

export const TutorialCard: FC<TutorialCardProps> = (props) => {
  const {
    cardPosition,
    placeholderText,
    cardList,
    isValidated,
    handleNext,
    handlePrev,
    setCardList,
  } = props

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCardList((prev) => {
      prev[cardPosition].title = e.target.value
      return [...prev]
    })
  }

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCardList((prev) => {
      prev[cardPosition].content = e.target.value
      return [...prev]
    })
  }

  return (
    <div
      className={css({
        w: 'full',
        maxW: '680px',
        px: '20px',
        py: '24px',
        bg: 'white',
        shadow: 'xl',
        rounded: '2xl',
        pos: 'relative',
        md: {
          px: '32px',
        },
      })}
    >
      {/* PC表示でのボタン */}
      <div
        className={css({
          display: 'none',
          lg: { display: 'block', pos: 'absolute', top: '180px', left: '-120px' },
        })}
      >
        <TutorialPCSwitchButton movement='prev' onClick={handlePrev} cardPosition={cardPosition} />
      </div>
      <div
        className={css({
          display: 'none',
          lg: { display: 'block', pos: 'absolute', top: '180px', right: '-120px' },
        })}
      >
        <TutorialPCSwitchButton movement='next' onClick={handleNext} cardPosition={cardPosition} />
      </div>

      <div className={hstack({ justify: 'space-between' })}>
        <span className={css({ fontSize: '2xl', fontWeight: 'bold' })}>
          {toPeriodStringFromNumber(cardList[cardPosition].period)}
        </span>
        {/* モバイル表示でのボタン */}
        <div
          className={hstack({
            lg: { display: 'none' },
          })}
        >
          <TutorialMobileSwitchButton
            movement='prev'
            onClick={handlePrev}
            cardPosition={cardPosition}
          />
          <TutorialMobileSwitchButton
            movement='next'
            onClick={handleNext}
            cardPosition={cardPosition}
          />
        </div>
      </div>

      <div
        className={flex({
          gap: '8px',
          mt: '8px',
          flexDir: 'column',
          md: { flexDir: 'row', alignItems: 'center' },
        })}
      >
        <label
          htmlFor='title'
          className={css({
            fontSize: 'md',
            fontWeight: 'bold',
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
          onChange={(e) => handleTitleChange(e)}
          value={cardList[cardPosition].title}
          placeholder='一言で'
          className={css({
            h: '40px',
            p: '8px',
            mb: '4px',
            borderBottomStyle: 'solid',
            borderBottomWidth: '2px',
            borderColor: 'slate.400',
            outline: 'none',
            fontSize: 'xl',
            _focus: {
              borderColor: 'blue.500',
            },
          })}
        />
      </div>
      {isValidated && <ValidationMessage message={'タイトルは必須です。'} />}
      <div
        className={vstack({
          mt: '12px',
          gap: '8px',
          alignItems: 'start',
        })}
      >
        <label htmlFor='content' className={css({ fontSize: 'md', fontWeight: 'bold' })}>
          内容
        </label>
        <textarea
          id='content'
          placeholder={`ヒント：${placeholderText}`}
          onChange={(e) => handleContentChange(e)}
          value={cardList[cardPosition].content}
          className={css({
            w: 'full',
            h: '270px',
            p: '8px',
            border: '2px solid',
            borderColor: 'slate.400',
            outline: 'none',
            resize: 'none',
            rounded: 'md',
            _focus: {
              borderColor: 'blue.500',
            },
          })}
        />
      </div>
    </div>
  )
}
