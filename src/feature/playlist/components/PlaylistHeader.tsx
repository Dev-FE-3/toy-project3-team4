import { usePlaylistStore } from '../stores/usePlaylistStore.ts'
import { X } from 'lucide-react'

const PlaylistHeader = () => {
  const { current, currentIndex, close } = usePlaylistStore()
  if (!current) return null

  return (
    <div className="flex items-center justify-between border-b bg-white px-4 py-3">
      <div>
        <h2 className="text-base font-bold">{current.title}</h2>
        <p className="text-sm text-gray-500">
          {current.ownerName} · {currentIndex + 1}/{current.videos.length}
        </p>
      </div>
      <button onClick={close}>
        <X size={20} />
      </button>
    </div>
  )
}

export default PlaylistHeader
