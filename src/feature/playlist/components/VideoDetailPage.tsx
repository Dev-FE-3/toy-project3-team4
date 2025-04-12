import { useState } from 'react'
import PlaylistFullModal from './PlaylistFullModal'
import PlaylistMiniModal from './PlaylistMiniModal'
import { IVideoItem } from '../types/IPlayList'
import useYoutubePlayListInfo from '../api/useYoutubePlayListInfo'
import useYoutubePlayListVideoInfo from '../api/useYoutubePlayListVideoInfo'

type YouTubePlaylistItem = {
  snippet: {
    resourceId: { videoId: string }
    title: string
    thumbnails: { high: { url: string } }
    videoOwnerChannelTitle: string
  }
}

const VideoDetailPage = ({ videoId, playlistId, myself = false }: { videoId: string; playlistId: string; myself?: boolean }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullOpen, setIsFullOpen] = useState(true)
  const { data: playlistInfo, isLoading: playlistInfoLoading, error: playlistInfoError } = useYoutubePlayListInfo(playlistId)
  const { data: playList, isLoading: playlistVideoInfoLoading, error: playlistVideoInfoError } = useYoutubePlayListVideoInfo(playlistId)

  console.log('playlistInfo', playlistInfo)
  console.log('playList', playList)

  if (playlistInfoLoading) return ''
  if (playlistInfoError) return ''
  if (playlistVideoInfoLoading) return ''
  if (playlistVideoInfoError) return ''
  if (!playList) return ''

  const nextVideo = playList[currentIndex + 1]

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
        <PlaylistMiniModal playlist={playList} currentIndex={currentIndex} nextVideo={nextVideo} onOpenFull={() => setIsFullOpen(true)} />
      )}
    </div>
  )
}

export default VideoDetailPage
