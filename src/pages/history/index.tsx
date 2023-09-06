import { Card, FadeInWrapper } from '@/components/common'
import MainLayout from '@/components/layouts/MainLayout'
import { CommonMeta } from '@/components/common/meta'
import { css } from '../../../styled-system/css'
import { useQueryCard } from '@/api/hooks/card/useQueryCard'
import { Suspense } from 'react'
import { vstack } from '../../../styled-system/patterns'

export default function History() {
  const { listCardsQuery } = useQueryCard()
  const { data } = listCardsQuery

  return (
    <>
      <CommonMeta
        title={'Recollect - 自分史'}
        description={'自分史を時系列で見ることができます。'}
      />
      <MainLayout>
        <FadeInWrapper>
          <div className={css({ w: '1200px', mx: 'auto', mt: '24px' })}>
            <h2 className={css({ fontSize: '3xl', fontWeight: 'bold' })}>naruto8864さんの自分史</h2>
            <div
              className={vstack({
                w: '720px',
                h: '640px',
                gap: '32px',
                overflowY: 'auto',
                mt: '24px',
                mx: 'auto',
                _scrollbar: { w: '10px' },
                _scrollbarTrack: { bg: 'slate.300' },
                _scrollbarThumb: { bg: 'dimBlue', borderRadius: 'md' },
                bg: 'slate.200',
                p: '24px',
              })}
            >
              <Suspense fallback={<p>Now Loading...</p>}>
                {data?.length ? (
                  data.map((d) => <Card key={d.id} contents={{ data: d }} />)
                ) : (
                  <li>nothing here...</li>
                )}
              </Suspense>
            </div>
          </div>
        </FadeInWrapper>
      </MainLayout>
    </>
  )
}
