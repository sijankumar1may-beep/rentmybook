// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
        <title>RentMyBook</title>
        <meta name="description" content="It provides variety of books on rent on the basis of subscriptions." />
        <link rel="icon" href="/rentmybooklogo.png"/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
