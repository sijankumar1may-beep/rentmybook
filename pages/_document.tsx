// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <Script id="google-tag-manager" strategy="afterInteractive" src="https://www.googletagmanager.com/gtm.js?id=GTM-N4KNXKQ6" />
          <link rel="icon" href="/rentmybooklogo.png" />
        </Head>
        <body>
          <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N4KNXKQ6"
            height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe></noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
