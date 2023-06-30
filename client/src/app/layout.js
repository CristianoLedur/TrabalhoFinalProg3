import './globals.css';
import { Providers } from '../providers';
import Dashboard from '../components/Dashboard';
import Footer from '../components/Footer';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Dashboard />
          <main className="pb-5 mt-[61px]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}