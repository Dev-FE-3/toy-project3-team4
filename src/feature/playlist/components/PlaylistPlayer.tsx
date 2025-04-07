import { usePlaylistStore } from '../stores/usePlaylistStore.ts'

const PlaylistPlayer = () => {
  const { current, currentIndex } = usePlaylistStore()
  if (!current) return null

  const video = current.videos[currentIndex]

  return (
    <div className="relative aspect-video w-full bg-black">
      <iframe className="h-full w-full" src={`https://www.youtube.com/embed/${video.id}?autoplay=1`} allowFullScreen title={video.title} />
    </div>
  )
}

export default PlaylistPlayer
