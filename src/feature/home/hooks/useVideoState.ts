import { useState, useCallback } from 'react'
import { usePlayListModalStore } from '@/shared/store/modal/usePlayListModalStore'

export const useVideoState = () => {
  const [videoId, setVideoId] = useState('')
  const openPlayList = usePlayListModalStore((state) => state.openPlayList)

  const handleVideoSelect = useCallback((id: string) => {
    setVideoId(id)
    openPlayList()
  }, [])

  return { videoId, handleVideoSelect }
}
