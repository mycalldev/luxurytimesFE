import './globals.css'
import { Roboto } from 'next/font/google'
import ConditionalNavbar from './components/ConditionalNavbar'
import Footer from './components/Footer'
import CookieConsent from './components/CookieConsent'
import ConditionalGA from './components/ConditionalGA'
import ConditionalGTM from './components/ConditionalGTM'
import ClientBreadcrumb from './components/ClientBreadcrumb'
import LiveChat from './components/LiveChat'

const roboto = Roboto({ weight: '400', subsets: ['latin'] })


export const metadata = {
  metadataBase: new URL('https://luxurytimesltd.co.uk'),
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
        <ConditionalNavbar />
        <ClientBreadcrumb />
        {children}
        <Footer />
        <CookieConsent />
        <ConditionalGA gaId="G-SCQ0GFX7DY" />
        <ConditionalGTM gtmId="GTM-W6DL3CRZ" />
        <LiveChat />
      </body>
    </html>
  )
}
