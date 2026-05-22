'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'

const HIDDEN_PATHS = ['/landing/daytona']

export default function ConditionalNavbar() {
  const pathname = usePathname()
  if (HIDDEN_PATHS.includes(pathname)) return null
  return <Navbar />
}
