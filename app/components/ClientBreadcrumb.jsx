'use client'

import dynamic from 'next/dynamic'

const Breadcrumb = dynamic(() => import('./Breadcrumb'), { ssr: false })

export default function ClientBreadcrumb() {
  return <Breadcrumb />
}
