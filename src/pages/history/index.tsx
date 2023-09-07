import { Card, FadeInWrapper } from '@/components/common'
import MainLayout from '@/components/layouts/MainLayout'
import { CommonMeta } from '@/components/common/meta'
import { css } from '../../../styled-system/css'
import { useQueryCard } from '@/api/hooks/card/useQueryCard'
import { Suspense } from 'react'
import { vstack } from '../../../styled-system/patterns'
import { CardBox } from '@/components/history/partials/CardBox'
import { Card as TCard } from '@/api/models'

const period_with_number = {
  現在まで: 0,
  高校生: 1,
  中学生: 2,
  小学生: 3,
  幼少期: 4,
}

const sortCardsByPeriod = (data: TCard[]) => {
  const results = []
  for (let i = 0; i < Object.keys(period_with_number).length; i++) {
    const arr = []
    for (const d of data) {
      if (period_with_number[d.period] === i) {
        arr.push(d)
      }
    }
    results.push(arr)
  }

  return results
}

export default function History() {
  const { listCardsQuery } = useQueryCard()
  const { data } = listCardsQuery

  const allCards = data ? sortCardsByPeriod(data) : []

  return (
    <>
      <CommonMeta
        title={'Recollect - 自分史'}
        description={'自分史を時系列で見ることができます。'}
      />
      <MainLayout>
        <FadeInWrapper>
          <div className={css({ w: '840px', mx: 'auto', mt: '24px' })}>
            <h2 className={css({ fontSize: '3xl', fontWeight: 'bold' })}>naruto8864さんの自分史</h2>
            <div
              className={vstack({
                w: 'full',
                h: '640px',
                gap: '32px',
                overflowY: 'auto',
                mt: '24px',
                mx: 'auto',
                p: '24px',
                _scrollbar: { w: '10px' },
                _scrollbarTrack: { bg: 'slate.300' },
                _scrollbarThumb: { bg: 'dimBlue', borderRadius: 'md' },
                rounded: 'xl',
              })}
            >
              <Suspense fallback={<p>Now Loading...</p>}>
                {allCards.map((cards, index) => {
                  const period = Object.keys(period_with_number)[index]

                  return (
                    <CardBox key={index} period={period}>
                      {cards.length ? (
                        cards.map((card) => {
                          return <Card contents={{ data: card }} key={card.id} />
                        })
                      ) : (
                        <p
                          className={vstack({
                            w: 'full',
                            fontWeight: 'bold',
                            bg: 'white',
                            p: '4px',
                            rounded: '2xl',
                          })}
                        >
                          自分史が登録されていません
                        </p>
                      )}
                    </CardBox>
                  )
                })}
              </Suspense>
            </div>
          </div>
        </FadeInWrapper>
      </MainLayout>
    </>
  )
}
