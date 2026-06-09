import './globals.css'
import Script from 'next/script'
import { Roboto, Cormorant_Garamond } from 'next/font/google'
import { GoogleTagManager } from '@next/third-parties/google'
import ConditionalNavbar from './components/ConditionalNavbar'
import Footer from './components/Footer'
import CookieConsent from './components/CookieConsent'
import ConditionalGA from './components/ConditionalGA'
import ClientBreadcrumb from './components/ClientBreadcrumb'
import LiveChat from './components/LiveChat'

const roboto = Roboto({ weight: '400', subsets: ['latin'] })

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-cormorant',
})


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
      <head>
        <Script
          id="consent-default"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              window.gtag = function(){window.dataLayer.push(arguments);}
              window.gtag('consent', 'default', {
                analytics_storage: 'denied',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
              });
            `,
          }}
        />
      </head>
      <body className={`${roboto.className} ${cormorant.variable}`}>
        <GoogleTagManager gtmId="GTM-W6DL3CRZ" />
        <ConditionalNavbar />
        <ClientBreadcrumb />
        {children}
        <Footer />
        <CookieConsent />
        <ConditionalGA gaId="G-SCQ0GFX7DY" />
        <LiveChat />
      </body>
    </html>
  )
}
