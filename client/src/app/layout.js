'use client'
import './globals.css';
import HeaderOff from '../components/HeaderOff';
import Dashboard from '../components/Dashboard';
import Footer from '../components/Footer';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext.js';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Trabalho de Prog3',
  description: 'App para curricularização de ação de extensão do IF',
}

export default function RootLayout({ children }) {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <html lang="en">
      <body className={inter.className}>
          {isAuthenticated ? <Dashboard /> : <HeaderOff />}
          <main className="pb-5 mt-[61px]">{children}</main>
          <Footer />
      </body>
    </html>
  )
}
