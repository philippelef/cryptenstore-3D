import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
        {/* <link
            rel="preload"
            href="/fonts/grot.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        <link
            rel="preload"
            href="/fonts/grot.ttf"
            as="font"
            type="font/ttg"
            crossOrigin="anonymous"
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument