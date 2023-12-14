import { FC } from 'react'
import { css } from '../../../../styled-system/css'
import { TAnalysisType } from '@/pages/analysis'

type AnalysisTabsItemProps = {
  label: string
  role: TAnalysisType
  analysisType: TAnalysisType
  onClickFunc: () => void
}

export const AnalysisTabsItem: FC<AnalysisTabsItemProps> = (props) => {
  const { label, role, analysisType, onClickFunc } = props
  return (
    <li>
      <button
        className={css({
          p: '12px',
          fontWeight: 'bold',
          cursor: 'pointer',
          color: analysisType === role ? 'dimBlue' : 'slate.400',
          borderBottomWidth: '2px',
          borderBottomStyle: 'solid',
          borderColor: analysisType === role ? 'dimBlue' : 'slate.400',
          _hover: {
            bg: 'gray',
          },
        })}
        onClick={onClickFunc}
      >
        {label}
      </button>
    </li>
  )
}
