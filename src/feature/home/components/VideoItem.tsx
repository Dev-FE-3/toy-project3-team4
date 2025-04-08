import { Bookmark } from 'lucide-react'
import { VideoItemProps } from '../type/IVideoTypes'
import VideoThumbnail from '@/shared/component/video/VideoThumnail'
import ChannelAvatar from '@/shared/component/video/ChannelAvatar'
import VideoInfo from '@/shared/component/video/VideoInfo'
import useChannelInfo from '../api/useChannelInfo'

const VideoItem: React.FC<VideoItemProps> = ({ item }) => {
  const { data: channelData } = useChannelInfo(item.snippet.channelId)
  const channelThumbnail = channelData?.items[0]?.snippet?.thumbnails?.default?.url

  const handleBookmarkClick = () => {
    console.log('bookmark clicked')
  }

  return (
    <li className="mb-5 w-full">
      <VideoThumbnail videoId={item.id} thumbnailUrl={item.snippet.thumbnails.high.url} />

      <div className="flex items-start gap-3">
        <ChannelAvatar channelId={item.snippet.channelId} channelThumbnail={channelThumbnail} />
        <VideoInfo
          videoId={item.id}
          title={item.snippet.title}
          viewCount={Number(item.statistics.viewCount)}
          publishedAt={item.snippet.publishedAt}
        />
        {/* 버튼 바꾸기 */}
        <Bookmark size={20} className="cursor-pointer stroke-gray-dark" strokeWidth={1.5} onClick={handleBookmarkClick} />
      </div>
    </li>
  )
}

export default VideoItem
