import { Html, Head, Main, NextScript } from 'next/document'
import { css } from '../../styled-system/css'

export default function Document() {
  return (
    <Html lang='ja'>
      <Head />
      <body
        className={css({
          backgroundColor: 'lightGray',
          wordBreak: 'break-all',
          overflowWrap: 'break-word',
        })}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
