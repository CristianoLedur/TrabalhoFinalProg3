'use client';
import './globals.css';
import { Providers } from '../providers';
import Dashboard from '../components/Dashboard';
import Footer from '../components/Footer';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { checkIsPublicRoute } from '../functions/check-is-public-route';
import PrivateRoute from '../components/PrivateRoute';
const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {

  const pathname = usePathname();

  const isPublicPage = checkIsPublicRoute(pathname);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Dashboard />
          <main className="pb-5 mt-[61px]">
            {isPublicPage && children}
            {!isPublicPage && <PrivateRoute>{children}</PrivateRoute>}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}