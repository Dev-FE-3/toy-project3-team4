import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PlaylistPlayer from './PlaylistPlayer'
import PlaylistFullModal from './PlaylistFullModal'
import PlaylistMiniModal from './PlaylistMiniModal'
import { fetchYoutubePlayListVideoInfo } from '@/shared/util/youtube'
import { VideoItem } from '../types/IPlayList'

const VideoDetailPage = () => {
  const [params] = useSearchParams()
  const playlistId = 'PLGhOCcpfhWjfoZCf1iNRHFm8U9Xjc9RRQ'
  const videoId = params.get('video')!

  const [playlist, setPlaylist] = useState<VideoItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullOpen, setIsFullOpen] = useState(true)

  useEffect(() => {
    const init = async () => {
      const result = await fetchYoutubePlayListVideoInfo(playlistId)
      const videos: VideoItem[] = result.items.map((item: any) => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumbnailUrl: item.snippet.thumbnails.high.url,
        ownerName: item.snippet.videoOwnerChannelTitle,
      }))
      setPlaylist(videos)
      const index = videos.findIndex((v) => v.id === videoId)
      setCurrentIndex(index !== -1 ? index : 0)
    }
    init()
  }, [playlistId, videoId])

  const currentVideo = playlist[currentIndex]
  const nextVideo = playlist[currentIndex + 1]

  return (
    <div className="relative">
      <PlaylistPlayer video={currentVideo} />
      <div className="text-sm text-gray-600">영상 상세 설명 영역</div>

      {isFullOpen ? (
        <PlaylistFullModal
          playlistId={playlistId}
          playlist={playlist}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          setIsFullOpen={setIsFullOpen}
        />
      ) : (
        <PlaylistMiniModal currentIndex={currentIndex} playlist={playlist} nextVideo={nextVideo} onOpenFull={() => setIsFullOpen(true)} />
      )}
    </div>
  )
}

export default VideoDetailPage
