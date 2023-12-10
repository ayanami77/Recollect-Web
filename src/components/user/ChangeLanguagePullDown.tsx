import { ChangeEvent } from 'react'
import { css } from '../../../styled-system/css'

type Props = {
  language: string
  setLanguage: React.Dispatch<React.SetStateAction<string>>
}
export const ChangeLanguagePullDown = (props: Props) => {
  const { language, setLanguage } = props

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value)
  }
  return (
    <div
      className={css({
        mt: '24px',
        mb: '24px',
        ml: '12px',
      })}
    >
      <h2
        className={css({
          mb: '16px',
          fontSize: '1.5em',
          fontWeight: 'bold',
        })}
      >
        言語選択
      </h2>
      <select
        className={css({
          py: '7px',
          px: '10px',
          rounded: 'md',
          border: '2px solid #ddd',
          fontSize: '1em',
          bg: '#fff',
          cursor: 'pointer',
          _focus: {
            outline: 'none',
            borderColor: '#aaa',
          },
        })}
        value={language}
        onChange={handleLanguageChange}
      >
        <option value='ja'>日本語</option>
        <option value='en'>English</option>
      </select>
    </div>
  )
}
