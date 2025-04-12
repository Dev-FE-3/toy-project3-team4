import { useState } from 'react'
import PlaylistFullModal from './PlaylistFullModal'
import PlaylistMiniModal from './PlaylistMiniModal'
import usePlayListInfo from '../api/usePlayListInfo'
import usePlayListVideoInfo from '../api/usePlayListVideoInfo'

const VideoDetailPage = ({ videoId, playListId, myself = false }: { videoId: string; playListId: string; myself?: boolean }) => {
  const { data: playListInfo, isLoading: playListInfoLoading, error: playListInfoError } = usePlayListInfo(playListId, myself)
  const { data: playList, isLoading: playListVideoInfoLoading, error: playListVideoInfoError } = usePlayListVideoInfo(playListId, myself)
  const [isFullOpen, setIsFullOpen] = useState(true)

  if (playListInfoLoading) return ''
  if (playListInfoError) return ''
  if (playListVideoInfoLoading) return ''
  if (playListVideoInfoError) return ''
  if (!playList) return ''
  if (!playListInfo) return ''

  console.log('playListInfo', playListInfo)
  console.log('playList', playList)

  return (
    <div className="relative">
      {isFullOpen ? (
        <PlaylistFullModal playListInfo={playListInfo} playList={playList} setIsFullOpen={setIsFullOpen} myself={true} />
      ) : (
        <PlaylistMiniModal videoId={videoId} playList={playList} onOpenFull={() => setIsFullOpen(true)} />
      )}
    </div>
  )
}

export default VideoDetailPage
