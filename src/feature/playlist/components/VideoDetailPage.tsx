import { useState } from 'react'
import PlaylistFullModal from './PlaylistFullModal'
import PlaylistMiniModal from './PlaylistMiniModal'
import useYoutubePlayListInfo from '../api/useYoutubePlayListInfo'
import useYoutubePlayListVideoInfo from '../api/useYoutubePlayListVideoInfo'

const VideoDetailPage = ({ videoId, playlistId, myself = false }: { videoId: string; playlistId: string; myself?: boolean }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullOpen, setIsFullOpen] = useState(true)
  const { data: playlistInfo, isLoading: playlistInfoLoading, error: playlistInfoError } = useYoutubePlayListInfo(playlistId)
  const { data: playList, isLoading: playlistVideoInfoLoading, error: playlistVideoInfoError } = useYoutubePlayListVideoInfo(playlistId)

  if (playlistInfoLoading) return ''
  if (playlistInfoError) return ''
  if (playlistVideoInfoLoading) return ''
  if (playlistVideoInfoError) return ''
  if (!playList) return ''

  return (
    <div className="relative">
      {isFullOpen ? (
        <PlaylistFullModal
          playlistInfo={playlistInfo}
          playlist={playList}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          setIsFullOpen={setIsFullOpen}
          myself={true}
        />
      ) : (
        <PlaylistMiniModal playlist={playList} onOpenFull={() => setIsFullOpen(true)} />
      )}
    </div>
  )
}

export default VideoDetailPage
