import { useState } from 'react'
import PlaylistFullModal from './PlaylistFullModal'
import PlaylistMiniModal from './PlaylistMiniModal'
import usePlayListInfo from '../api/usePlayListInfo'
import usePlayListVideoInfo from '../api/usePlayListVideoInfo'

const VideoDetailPage = ({ videoId, playlistId, myself = false }: { videoId: string; playlistId: string; myself?: boolean }) => {
  const [isFullOpen, setIsFullOpen] = useState(true)
  const { data: playlistInfo, isLoading: playlistInfoLoading, error: playlistInfoError } = usePlayListInfo(playlistId)
  const { data: playList, isLoading: playlistVideoInfoLoading, error: playlistVideoInfoError } = usePlayListVideoInfo(playlistId)

  if (playlistInfoLoading) return ''
  if (playlistInfoError) return ''
  if (playlistVideoInfoLoading) return ''
  if (playlistVideoInfoError) return ''
  if (!playList) return ''

  return (
    <div className="relative">
      {isFullOpen ? (
        <PlaylistFullModal playlistInfo={playlistInfo} playlist={playList} setIsFullOpen={setIsFullOpen} myself={true} />
      ) : (
        <PlaylistMiniModal videoId={videoId} playlist={playList} onOpenFull={() => setIsFullOpen(true)} />
      )}
    </div>
  )
}

export default VideoDetailPage
