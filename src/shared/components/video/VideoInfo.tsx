import { formatUploadDate, formatViewCount } from '@/shared/util/format'
import { Link } from 'react-router-dom'
import VideoInfoProps from './type/IVideoInfoProps'
import decodeHtmlEntities from './util/decodeHtmlEntities'

const VideoInfo = ({ videoId, title, viewCount, publishedAt }: VideoInfoProps) => {
  return (
    <div className="flex flex-1 flex-col gap-1">
      <Link to={`/watch?video=${videoId}`} className="line-clamp-2 text-base font-medium">
        {decodeHtmlEntities(title)}
      </Link>
      <div className="text-sm font-light text-gray-medium-dark">
        <span>조회수 {formatViewCount(viewCount)}</span>
        <span className="mx-1">•</span>
        <span>{formatUploadDate(publishedAt)}</span>
      </div>
    </div>
  )
}

export default VideoInfo
