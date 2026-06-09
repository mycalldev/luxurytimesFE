'use client'

import dynamic from 'next/dynamic'

const VideoEmbed = dynamic(() => import('./VideoEmbed'), { ssr: false })

export default function VideoEmbedWrapper(props) {
  return <VideoEmbed {...props} />
}
