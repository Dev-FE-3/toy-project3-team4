import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getPlaylist } from './api/usePlayList'
import Title from './components/PlaylistTitle'
import VideoItem from './components/PlayListVideoItem'
import PlaylistPreviewModal from './components/PlaylistPreviewModal'
import { usePlayerStore } from './store/playerStore'

export default function PlaylistView() {
  const { id } = useParams<{ id: string }>()

  const { data: playlist } = useQuery({
    queryKey: ['playlist', id],
    queryFn: () => getPlaylist(id!),
    enabled: !!id,
  })

  const { setCurrentVideo } = usePlayerStore()

  const handleClose = () => {
    window.history.back() // 모달 닫기 (이전 페이지로 이동)
  }

  const handleVideoClick = (videoId: string) => {
    const video = playlist?.videos.find((v) => v.id === videoId)
    if (video) setCurrentVideo(video)
  }

  if (!playlist) return null

  return (
    <div>
      <Title playlist={playlist} onClose={handleClose} />

      <div className="mt-4">
        {playlist.videos.map((video) => (
          <VideoItem key={video.id} video={video} onClick={() => handleVideoClick(video.id)} />
        ))}
      </div>

      <PlaylistPreviewModal
        onOpen={() => {
          // TODO: 모달 열기 로직 필요시 추가
        }}
      />
    </div>
  )
}
