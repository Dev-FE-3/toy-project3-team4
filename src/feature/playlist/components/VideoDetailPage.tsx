import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchPlaylistById } from '../services/fetchPlaylist'
import { usePlaylistStore } from '@/shared/store/usePlaylistStore'
import PlaylistPlayer from './PlaylistPlayer'
import PlaylistFullModal from './PlaylistFullModal'
import PlaylistMiniModal from './PlaylistMiniModal'

const VideoDetailPage = () => {
  const [params] = useSearchParams()
  const { openPlaylist } = usePlaylistStore()

  const playlistId = params.get('playlist')
  const videoId = params.get('video')

  useEffect(() => {
    if (playlistId && videoId) {
      fetchPlaylistById(playlistId).then((playlist) => {
        const index = playlist.videos.findIndex((v) => v.id === videoId)
        openPlaylist(playlist, index >= 0 ? index : 0)
      })
    }
  }, [playlistId, videoId])

  return (
    <div className="relative">
      <PlaylistPlayer />
      <div className="text-sm text-gray-600">여기에 동영상 상세 내용</div>
      <PlaylistFullModal />
      <PlaylistMiniModal />
    </div>
  )
}

export default VideoDetailPage
