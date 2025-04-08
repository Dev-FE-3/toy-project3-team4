// components/PlaylistPlayer.tsx
import { usePlaylistStore } from '../stores/usePlaylistStore'

const PlaylistPlayer = () => {
  const { current, currentIndex } = usePlaylistStore()
  if (!current) return null

  const video = current.videos[currentIndex]

  return (
    <div className="relative aspect-video w-full">
      <iframe className="h-full w-full" src={`https://www.youtube.com/embed/${video.id}?autoplay=1`} allowFullScreen title={video.title} />
    </div>
  )
}

export default PlaylistPlayer
