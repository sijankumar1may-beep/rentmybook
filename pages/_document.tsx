// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <title>Rent Books Online in India @ ₹3/Day | RentMyBooks</title>
          <meta name="description" content="Rent books online in India at just ₹3 per day. Affordable book rental for students with fast delivery and wide book collection. Save money with RentMyBooks." />
          <link rel="icon" href="/rentmybooklogo.png" />
          <meta name="keywords" content="rent books online, book rental india, rent textbooks, rent books for students, online book rental, cheap book rent, rent books india, textbook rental india, rent academic books
"/>
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
