import './globals.css'
import { Roboto } from 'next/font/google'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CookieConsent from './components/CookieConsent'
import ConditionalGA from './components/ConditionalGA'
import Breadcrumb from './components/Breadcrumb'

const roboto = Roboto({ weight: '400', subsets: ['latin'] })


export const metadata = {
  title: 'Luxury Times Ltd',
  description: 'Discover premium luxury watches and fine jewellery - Rolex, Patek Philippe & Audemars Piguet',
  verification: {
    google: "3EtCpdg61XcRZkS6YrJjTI14hZLUUAGPhZgsOtf54_8",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Navbar />
        <Breadcrumb />
        {children}
        <Footer />
        <CookieConsent />
        <ConditionalGA gaId="G-SCQ0GFX7DY" />
      </body>
    </html>
  )
}
