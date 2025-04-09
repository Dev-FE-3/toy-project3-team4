import { Link } from 'react-router-dom'
import VideoThumbnailProps from './type/IVideoThumbnailProps'

const VideoThumbnail = ({ videoId, thumbnailUrl }: VideoThumbnailProps) => {
  return (
    <Link to={`/watch?video=${videoId}`} className="mb-[14px] block aspect-video w-full overflow-hidden rounded-[10px] bg-gray-100">
      <img className="h-full w-full rounded-[10px] object-cover" src={thumbnailUrl} alt="동영상 썸네일" />
    </Link>
  )
}

export default VideoThumbnail
