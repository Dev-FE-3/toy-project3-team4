import { usePlayerStore } from '../store/playerStore'

export default function PlaylistPreviewModal({ onOpen }: { onOpen: () => void }) {
  const { playlist, currentVideo } = usePlayerStore()
  const nextIndex = playlist.findIndex((v) => v.id === currentVideo?.id) + 1
  const nextVideo = playlist[nextIndex]

  if (!nextVideo) return null

  return (
    <div onClick={onOpen} className="fixed bottom-14 w-full cursor-pointer bg-white px-4 py-2 shadow-md">
      <div className="flex items-center gap-3">
        <img src={nextVideo.thumbnailUrl} alt="Next" className="h-8 w-12 rounded object-cover" />
        <p className="line-clamp-1 text-sm">{nextVideo.title}</p>
      </div>
    </div>
  )
}
