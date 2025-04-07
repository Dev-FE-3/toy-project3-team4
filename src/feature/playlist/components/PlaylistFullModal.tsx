import { usePlaylistStore } from '../stores/usePlaylistStore.ts'
import PlaylistHeader from './PlaylistHeader'
import PlaylistVideoItem from './PlaylistVideoItem'

const PlaylistFullModal = () => {
  const { current, isFullOpen } = usePlaylistStore()
  if (!current || !isFullOpen) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 max-h-[60%] overflow-y-auto rounded-t-xl bg-white shadow-md">
      <PlaylistHeader />
      <div>
        {current.videos.map((video, idx) => (
          <PlaylistVideoItem key={video.id} video={video} index={idx} />
        ))}
      </div>
    </div>
  )
}

export default PlaylistFullModal
