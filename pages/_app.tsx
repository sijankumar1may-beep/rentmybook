// pages/_app.tsx
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/context/cart-context";
import { AuthProvider } from "@/context/auth-context";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import pushToDataLayer from "@/lib/utils";
import Head from "next/head";
import { useEffect, useState } from "react";
const inter = Inter({ subsets: ["latin"] });
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const url = router.asPath;
  const [queryClient] = useState(() => new QueryClient());
  useEffect(() => {
    pushToDataLayer({ event: "page_view", ["Page URL"]: url });
  }, [router, router.asPath]);

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-TLH377T15B"
        strategy="beforeInteractive"
      />
      <Script id="google-analytics" strategy="beforeInteractive">
        {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-TLH377T15B');
  `}
      </Script>

      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <CartProvider>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1 hero-pattern">
                  <Component {...pageProps} />
                </main>
                <Footer />
              </div>
              <Toaster />
            </CartProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
