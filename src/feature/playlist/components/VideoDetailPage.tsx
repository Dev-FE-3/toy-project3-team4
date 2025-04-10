import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PlaylistPlayer from './PlaylistPlayer'
import PlaylistFullModal from './PlaylistFullModal'
import PlaylistMiniModal from './PlaylistMiniModal'
import { fetchYoutubePlayListVideoInfo } from '@/shared/util/youtube'
import { IVideoItem } from '../types/IPlayList'

type YouTubePlaylistItem = {
  snippet: {
    resourceId: { videoId: string }
    title: string
    thumbnails: { high: { url: string } }
    videoOwnerChannelTitle: string
  }
}

const VideoDetailPage = () => {
  const [params] = useSearchParams()
  const playlistId = 'PLGhOCcpfhWjfoZCf1iNRHFm8U9Xjc9RRQ'
  const videoId = params.get('video')!

  const [playlist, setPlaylist] = useState<IVideoItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullOpen, setIsFullOpen] = useState(true)

  useEffect(() => {
    const init = async () => {
      try {
        const result = await fetchYoutubePlayListVideoInfo(playlistId)
        const videos: IVideoItem[] = (result.items as YouTubePlaylistItem[]).map((item) => ({
          id: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          thumbnailUrl: item.snippet.thumbnails.high.url,
          ownerName: item.snippet.videoOwnerChannelTitle,
        }))
        setPlaylist(videos)
        const index = videos.findIndex((v) => v.id === videoId)
        setCurrentIndex(index !== -1 ? index : 0)
      } catch (err) {
        console.error('재생목록 로딩 실패:', err)
      }
    }

    init()
  }, [playlistId, videoId])

  const currentVideo = playlist[currentIndex]
  const nextVideo = playlist[currentIndex + 1]

  return (
    <div className="relative">
      <PlaylistPlayer video={currentVideo} />
      {isFullOpen ? (
        <PlaylistFullModal
          playlistId={playlistId}
          playlist={playlist}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          setIsFullOpen={setIsFullOpen}
          myself={true}
        />
      ) : (
        <PlaylistMiniModal playlist={playlist} currentIndex={currentIndex} nextVideo={nextVideo} onOpenFull={() => setIsFullOpen(true)} />
      )}
    </div>
  )
}

export default VideoDetailPage
