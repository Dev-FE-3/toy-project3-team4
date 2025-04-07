import { Lock, Unlock, X } from 'lucide-react'
import { Playlist } from '../type/playlist'
import { togglePlaylistVisibility } from '../api/usePlayList'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
  playlist: Playlist
  onClose: () => void
}

export default function PlaylistHeader({ playlist, onClose }: Props) {
  const queryClient = useQueryClient()

  const handleToggle = async () => {
    try {
      await togglePlaylistVisibility(playlist.id)

      // ✅ react-query v5에서는 객체 형태로 key 지정
      queryClient.invalidateQueries({
        queryKey: ['playlist', playlist.id],
      })
    } catch (error) {
      console.error('공개 여부 토글 중 오류 발생:', error)
    }
  }

  return (
    <div className="flex items-start justify-between px-4 pt-4">
      <div>
        <h1 className="text-base font-semibold">
          {playlist.title}
          <span className="ml-1 text-sm text-gray-500">({playlist.videos.length})</span>
        </h1>
        <p className="text-sm text-gray-400">{playlist.authorName}</p>
      </div>

      <div className="flex items-center gap-2">
        {playlist.isMyPlaylist && (
          <button onClick={handleToggle}>{playlist.isPublic ? <Unlock className="h-5 w-5" /> : <Lock className="h-5 w-5" />}</button>
        )}
        <X onClick={onClose} className="cursor-pointer text-xl" />
      </div>
    </div>
  )
}
