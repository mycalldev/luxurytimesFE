import './globals.css'
import { Roboto } from 'next/font/google'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { GoogleTagManager } from '@next/third-parties/google' 

const roboto = Roboto({ weight: '400', subsets: ['latin'] })


export const metadata = {
  title: 'Luxury Times Ltd',
  description: 'Everything Luxury',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Navbar />
        {children}
        <Footer />
        <GoogleTagManager gtmId="GTM-WLHSGJ8C" />
      </body>
    </html>
  )
}
