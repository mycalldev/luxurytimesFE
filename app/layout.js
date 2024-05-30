import './globals.css'
import { Roboto } from 'next/font/google'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Script from 'next/script'
import { GoogleTagManager } from '@next/third-parties/google' 


const roboto = Roboto({ weight: '400', subsets: ['latin'] })

export const metadata = {
  title: 'Luxury Times Ltd',
  description: 'Pre-Owned Watch Dealers',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* <Script 
          id='gtm'
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            _html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WLHSGJ8C');`
          }}>
        </Script> */}
        {/* <Script async src="https://www.googletagmanager.com/gtag/js?id=G-Y718E32WBX"></Script>
        <Script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date());

            gtag('config', 'G-Y718E32WBX');
        </Script> */}
      </head>
      <body className={roboto.className}>
        <Navbar />
        {children}
        <Footer />
        <GoogleTagManager gtmId="GTM-WLHSGJ8C" />
      </body>
    </html>
  )
}
