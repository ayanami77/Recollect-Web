import { Dispatch, FC, SetStateAction } from 'react'
import { css } from '../../../../styled-system/css'
import { hstack } from '../../../../styled-system/patterns'
import { AnalysisTabsItem } from './AnalysisTabsItem'
import { TAnalysisType } from '@/pages/analysis'

type AnalysisTabsProps = {
  analysisType: TAnalysisType
  setAnalysisType: Dispatch<SetStateAction<TAnalysisType>>
}
export const AnalysisTabs: FC<AnalysisTabsProps> = (props) => {
  const { analysisType, setAnalysisType } = props
  return (
    <div className={css({ w: 'fit-content', ml: 'auto', mt: '10px', md: { mt: '0px' } })}>
      <ul className={hstack({ gap: '0' })}>
        <AnalysisTabsItem
          label='ひとつずつ分析'
          role='onebyone'
          analysisType={analysisType}
          onClickFunc={() => setAnalysisType('onebyone')}
        />
        <AnalysisTabsItem
          label='総合分析（β版）'
          role='comprehensive'
          analysisType={analysisType}
          onClickFunc={() => setAnalysisType('comprehensive')}
        />
      </ul>
    </div>
  )
}
