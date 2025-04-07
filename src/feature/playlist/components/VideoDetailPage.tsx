// src/components/Playlist/VideoDetailPage.tsx
import { useEffect } from 'react'
import PlaylistPlayer from './PlaylistPlayer'
import PlaylistFullModal from './PlaylistFullModal'
import PlaylistMiniModal from './PlaylistMiniModal'
import { usePlaylistStore } from '../stores/usePlaylistStore.ts'

const VideoDetailPage = () => {
  const { current, setCurrentIndex } = usePlaylistStore()

  // 기본적으로 첫 번째 트랙에서 시작
  useEffect(() => {
    if (current) setCurrentIndex(0)
  }, [current])

  return (
    <div className="relative">
      <PlaylistPlayer />
      <div className="p-4">여기에 동영상 상세 내용</div>
      <PlaylistFullModal />
      <PlaylistMiniModal />
    </div>
  )
}

export default VideoDetailPage
