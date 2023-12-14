import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { hstack } from '../../../styled-system/patterns'
import { m } from 'framer-motion'
import { faMagnifyingGlassChart } from '@fortawesome/free-solid-svg-icons'
import { FC } from 'react'

type AnalysisAnalyzeButtonProps = {
  isLoading: boolean
  analysisResult: string
  onClickFunc: () => void
}
export const AnalysisAnalyzeButton: FC<AnalysisAnalyzeButtonProps> = (props) => {
  const { isLoading, analysisResult, onClickFunc } = props
  return (
    <m.button
      className={hstack({
        maxW: '280px',
        w: 'full',
        mx: 'auto',
        mt: '16px',
        px: '20px',
        py: '12px',
        bg: 'dimBlue',
        fontSize: 'md',
        fontWeight: 'bold',
        color: 'white',
        rounded: 'xl',
        cursor: 'pointer',
        justify: 'center',
        _disabled: {
          opacity: '0.8',
          cursor: 'default',
        },
        md: {
          fontSize: 'lg',
        },
      })}
      disabled={isLoading ? true : false}
      onClick={onClickFunc}
      whileTap={isLoading ? { scale: 1 } : { scale: 0.9 }}
    >
      <FontAwesomeIcon
        icon={faMagnifyingGlassChart}
        style={{ width: '24px', height: '24px', color: 'white' }}
      />
      {analysisResult ? 'もう一度分析してみる' : '分析してみる'}
    </m.button>
  )
}
