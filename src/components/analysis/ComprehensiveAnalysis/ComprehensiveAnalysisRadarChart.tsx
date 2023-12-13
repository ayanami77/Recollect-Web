import { FC } from 'react'
import { Radar } from 'react-chartjs-2'
import { center } from '../../../../styled-system/patterns'

const toArrayFromStringComprehensiveAnalysisScore = (stringScoreData: string) => {
  const dataRegex = /\_\_(.*?)\_\_/g
  const data = stringScoreData.match(dataRegex)?.map((v) => v.slice(2, v.length - 2))

  const labelRegex = /\*\*(.*?)\*\*/g
  const labels = stringScoreData.match(labelRegex)?.map((v) => v.slice(2, v.length - 2))

  return { data, labels }
}

type ComprehensiveAnalysisRadarChartProps = {
  comprehensiveAnalysisScore: string
}
export const ComprehensiveAnalysisRadarChart: FC<ComprehensiveAnalysisRadarChartProps> = (
  props,
) => {
  const { comprehensiveAnalysisScore } = props

  const { data, labels } = toArrayFromStringComprehensiveAnalysisScore(comprehensiveAnalysisScore)

  return (
    <div
      className={center({
        maxW: '500px',
        w: 'full',
        mx: 'auto',
        mt: '32px',
      })}
    >
      <Radar
        data={{
          labels: labels,
          datasets: [
            {
              label: 'あなたの特性',
              data: data,
              backgroundColor: 'rgba(57, 230, 178, 0.1)',
              borderColor: 'rgba(57, 230, 178)',
              borderWidth: 1,
            },
          ],
        }}
        options={{
          scales: {
            r: {
              max: 100,
              min: 0,
              ticks: {
                stepSize: 20,
                display: false,
              },
              pointLabels: {
                callback: (label, index) => {
                  const displayedLabel =
                    `${index + 1}. ` + label.substring(0, 4) + (4 < label.length ? '...' : '')
                  return displayedLabel
                },
              },
            },
          },
        }}
      />
    </div>
  )
}
