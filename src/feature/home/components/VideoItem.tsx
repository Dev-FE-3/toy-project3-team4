import { Avatar, AvatarImage } from '@/shared/lib/shadcn/ui/avatar'
import { Bookmark } from 'lucide-react'
import { useYoutubeChannel } from '@/shared/util/youtube'
import { formatUploadDate, formatViewCount } from '@/shared/util/format'
import { VideoItemProps } from '../type/IYouTubeItem'
import { Link } from 'react-router-dom'

const VideoItem: React.FC<VideoItemProps> = ({ item }) => {
  const { data: channelData } = useYoutubeChannel(item.snippet.channelId)
  const channelThumbnail = channelData?.items[0]?.snippet?.thumbnails?.default?.url

  const handleBookmarkClick = () => {
    console.log('bookmark clicked')
  }

  return (
    <li className="mb-5 w-full">
      {/* 동영상 썸네일 */}
      <Link to={`/video/${item.id}`} className="mb-[14px] block aspect-video w-full overflow-hidden rounded-[10px] bg-gray-100">
        <img className="h-full w-full object-cover" src={item.snippet.thumbnails.high.url} alt={item.snippet.title} />
      </Link>

      <div className="flex items-start gap-3">
        {/* 채널 프로필 이미지 */}
        <Link to={`/channel/${item.snippet.channelId}`}>
          <Avatar className="h-9 w-9">
            <AvatarImage
              className="rounded-full border border-gray-medium object-cover"
              src={channelThumbnail || '/image/download/background.svg'}
              alt={item.snippet.channelTitle}
            />
          </Avatar>
        </Link>

        {/* 동영상 제목, 조회수, 업로드 날짜 */}
        <div className="flex flex-1 flex-col gap-2">
          <Link to={`/video/${item.id}`} className="line-clamp-2 text-base font-medium">
            {item.snippet.title}
          </Link>
          <div className="text-sm font-light text-gray-medium-dark">
            <span>조회수 {formatViewCount(item.statistics.viewCount)}</span>
            <span className="mx-1">•</span>
            <span>{formatUploadDate(item.snippet.publishedAt)}</span>
          </div>
        </div>

        {/* 북마크 버튼 */}
        <Bookmark size={20} className="cursor-pointer stroke-gray-dark" strokeWidth={1.5} onClick={handleBookmarkClick} />
      </div>
    </li>
  )
}

export default VideoItem
