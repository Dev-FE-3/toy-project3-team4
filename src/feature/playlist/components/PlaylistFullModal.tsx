import { usePlaylistStore } from '../stores/usePlaylistStore.ts'
import PlaylistHeader from './PlaylistHeader'
import PlaylistVideoItem from './PlayListVideoItem'

const PlaylistFullModal = () => {
  const { current, isFullOpen } = usePlaylistStore()
  if (!current || !isFullOpen) return null

  return (
    <div className="fixed bottom-[60px] top-[300px] z-50 flex w-[430px] flex-col bg-white shadow-xl">
      {/* 헤더 */}
      <PlaylistHeader />

      {/* 바디 (스크롤 영역) */}
      <div className="scrollbar-hide flex-1 overflow-y-auto px-[2px]">
        {current.videos.map((video, idx) => (
          <PlaylistVideoItem key={video.id} video={video} index={idx} />
        ))}
      </div>
    </div>
  )
}

export default PlaylistFullModal
