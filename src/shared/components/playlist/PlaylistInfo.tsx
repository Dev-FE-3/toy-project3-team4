import { formatUploadDate } from '@/shared/util/format'
import { Link } from 'react-router-dom'
import PlaylistInfoProps from './type/IPlaylistInfoProps'

const PlaylistInfo = ({ videoId, playlistId, title, publishedAt }: PlaylistInfoProps) => {
  return (
    <div className="flex flex-1 flex-col gap-1">
      <Link to={`/watch?video=${videoId}&playlist=${playlistId}`} className="line-clamp-2 text-base font-medium">
        {title}
      </Link>
      <div className="text-sm font-light text-gray-medium-dark">
        <span>{formatUploadDate(publishedAt)}</span>
      </div>
    </div>
  )
}

export default PlaylistInfo
