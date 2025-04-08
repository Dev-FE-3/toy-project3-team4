import { usePlaylistStore } from '../stores/usePlaylistStore'
import { X } from 'lucide-react'

const PlaylistHeader = () => {
  const { current, currentIndex, close } = usePlaylistStore()
  if (!current) return null

  return (
    <div className="flex items-center justify-between border-b bg-white px-4 py-3">
      <div>
        <h2 className="text-base font-bold">{current.title}</h2>
        <div className="flex items-center space-x-2">
          <span title={current.isPublic ? '공개' : '비공개'}>{current.isPublic ? '🌍' : '🔒'}</span>
        </div>
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
