import Head from 'next/head'
import { FC } from 'react'

type CommonMetaProps = {
  title: string
  description: string
}

export const CommonMeta: FC<CommonMetaProps> = (props) => {
  const { title, description } = props
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  )
}
