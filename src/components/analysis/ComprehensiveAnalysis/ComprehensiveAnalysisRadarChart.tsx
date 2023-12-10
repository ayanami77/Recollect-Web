import { FC } from 'react'
import { Radar } from 'react-chartjs-2'

// TODO
type ComprehensiveAnalysisRadarChartProps = object
export const ComprehensiveAnalysisRadarChart: FC<ComprehensiveAnalysisRadarChartProps> = (
  props,
) => {
  const {} = props
  return (
    <Radar
      data={{
        labels: [
          'リーダーシップ',
          '努力家',
          '技術力',
          '実験家',
          '計画的',
          'コミュニケーション能力',
        ],
        datasets: [
          {
            label: 'あなたの特性',
            data: [50, 70, 95, 84, 72, 92],
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
  )
}
