// pages/_app.tsx
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@/components/theme-provider';
import { CartProvider } from '@/context/cart-context';
import { AuthProvider } from '@/context/auth-context';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
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
    </ThemeProvider>
  );
}

export default MyApp;
