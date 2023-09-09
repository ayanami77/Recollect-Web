import { FadeInWrapper } from '@/components/common/framer-motion/FadeInWrapper'
import { Board, Button } from '@/components/analysis'
import { hstack } from '../../../styled-system/patterns'
import { useState } from 'react'
import MainLayout from '@/components/layouts/MainLayout'
import { CommonMeta } from '@/components/common/meta/CommonMeta'
import { useQueryCard } from '@/api/hooks/card/useQueryCard'
import { AnalysisDataNotRegistered } from '@/components/analysis/partials/AnalysisDataNotRegistered'

export default function Analysis() {
  const [index, setIndex] = useState(0)
  const { listCardsQuery } = useQueryCard()
  const { data } = listCardsQuery
  const prev = () => {
    const prevPos = index - 1
    if (data && prevPos < 0) {
      setIndex(data.length - 1)
    } else {
      setIndex(prevPos)
    }
  }

  const next = () => {
    const nextPos = index + 1
    if (data && data.length - 1 < nextPos) {
      setIndex(0)
    } else {
      setIndex(nextPos)
    }
  }
  // const [isAnalyzing, setIsAnalyzing] = useState(false)
  // const handleAnalyze = () => {
  //   setIsAnalyzing(true)
  // }
  return (
    <>
      <CommonMeta
        title={'Recollect - AI分析'}
        description={'Aiを利用することで、自分史カードから自分の特性を知ることができます。'}
      />
      <MainLayout>
        <FadeInWrapper>
          <div
            className={hstack({
              gap: '60px',
              w: 'fit',
              mx: 'auto',
              mt: '80px',
            })}
          >
            {data?.length ? (
              <>
                <Button content={{ movement: 'prev', onClick: prev }} />
                <Board content={data[index]} />
                <Button content={{ movement: 'next', onClick: next }} />
              </>
            ) : (
              <AnalysisDataNotRegistered />
            )}
          </div>
        </FadeInWrapper>
      </MainLayout>
    </>
  )
}
