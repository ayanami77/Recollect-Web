import { Card, FadeInWrapper } from '@/components/common'
import MainLayout from '@/components/layouts/MainLayout'
import { CommonMeta } from '@/components/common/meta'
import { css } from '../../../styled-system/css'

const mock_data = [
  {
    id: 0,
    period: '高校生',
    title: '文系でも化学部が楽しかった話!',
    content:
      '毎週、教科書で出てくるような有名な実験から面白い実験まで色々なことをしていました。やはり化学実験ではあるので、部員としっかりと協力して取り組んでいました。色々な事象を目の当たりにするたびにわくわくを沢山感じていました。さらに、文化祭準備期間では自分たちで何をするか考え、じっくりと時間をかけて楽しく取り組んでいました。',
    tags: ['責任感'],
    createdAt: '2023-09-01T12:14:57.548Z',
    updatedAt: '2023-09-01T12:14:57.548Z',
  },
]

export default function History() {
  return (
    <>
      <CommonMeta
        title={'Recollect - 自分史'}
        description={'自分史を時系列で見ることができます。'}
      />
      <MainLayout>
        <FadeInWrapper>
          <div className={css({ w: 'fit', mx: 'auto' })}>
            {mock_data.map((data, i) => (
              <Card key={i} contents={{ data }} />
            ))}
          </div>
        </FadeInWrapper>
      </MainLayout>
    </>
  )
}
