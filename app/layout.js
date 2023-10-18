import { Nunito } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Luxury Times Ltd',
  description: 'Pre-Owned Watch Dealers',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
