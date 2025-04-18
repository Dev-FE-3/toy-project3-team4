import { useState } from 'react'
import PlaylistFullModal from './PlaylistFullModal'
import PlaylistMiniModal from './PlaylistMiniModal'
import usePlayListVideoInfo from '../api/usePlayListVideoInfo'
import { useAuthStore } from '@/shared/store/auth/useAuthStore'
import usePlayListInfo from '../api/usePlayListInfo'

const VideoDetailPage = ({ videoId, playListId, myself = false }: { videoId: string; playListId: string; myself?: boolean }) => {
  const userId = useAuthStore((store) => store.user?.id) || 19

  const { data: playListInfo, isLoading: playListInfoLoading, error: playListInfoError } = usePlayListInfo(userId, playListId, myself)
  const { data: playList, isLoading: playListVideoInfoLoading, error: playListVideoInfoError } = usePlayListVideoInfo(playListId, myself)
  const [isFullOpen, setIsFullOpen] = useState(true)

  if (playListInfoLoading) return ''
  if (playListInfoError) return ''
  if (playListVideoInfoLoading) return ''
  if (playListVideoInfoError) return ''
  if (!playList) return ''
  if (!playListInfo) return ''

  return (
    <div className="relative">
      {isFullOpen ? (
        <PlaylistFullModal playListInfo={playListInfo} playList={playList} setIsFullOpen={setIsFullOpen} myself={myself} />
      ) : (
        <PlaylistMiniModal videoId={videoId} playList={playList} onOpenFull={() => setIsFullOpen(true)} />
      )}
    </div>
  )
}

export default VideoDetailPage
