import { Html, Head, Main, NextScript } from 'next/document'
import { css } from '../../styled-system/css'

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body className={css({ backgroundColor: 'lightGray' })}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
