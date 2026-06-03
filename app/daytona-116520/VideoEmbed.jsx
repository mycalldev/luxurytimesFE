'use client'

import { useRef } from 'react'
import { YouTubeEmbed } from '@next/third-parties/google'

export default function VideoEmbed({ videoid, playlabel }) {
  const firedRef = useRef(false)

  const handleClick = () => {
    if (firedRef.current) return
    firedRef.current = true

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'video_play', {
        video_id: videoid,
        video_title: playlabel,
        landing_page: 'daytona-116520',
      })
    }
  }

  return (
    <div onClick={handleClick}>
      <YouTubeEmbed videoid={videoid} playlabel={playlabel} params="enablejsapi=1" />
    </div>
  )
}
