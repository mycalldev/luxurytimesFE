import './globals.css'
import { Nunito } from 'next/font/google'
import Navbar from './components/Navbar'
import Footer from './components/Footer'


const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Luxury Times Ltd',
  description: 'Pre-Owned Watch Dealers',
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0 user-scalable=0",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
