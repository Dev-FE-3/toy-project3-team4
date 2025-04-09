import { ListVideo } from 'lucide-react'
import { Link } from 'react-router-dom'
import PlaylistThumbnailProps from './type/IPlaylistThumbnailProps'

const PlaylistThumbnail = ({ videoId, playlistId, thumbnailUrl, videoCount }: PlaylistThumbnailProps) => {
  return (
    <Link to={`/watch?video=${videoId}&playlist=${playlistId}`}>
      <div className="mb-[14px] flex h-full w-full flex-col items-center justify-center">
        <div className="h-3 w-[93%] rounded-tl-[10px] rounded-tr-[10px] bg-[#E0E0E2]"></div>
        <div className="relative">
          <img
            className="aspect-video h-full w-full rounded-[10px] object-cover shadow-[0px_-1px_4px_0px_rgba(0,0,0,0.25)]"
            src={thumbnailUrl}
            alt="플레이리스트 썸네일"
          />
          <div className="absolute bottom-5 right-5 flex items-center gap-1 rounded-full bg-black/40 px-[12px] py-[3px]">
            <ListVideo size={20} className="stroke-basic-white" strokeWidth={2} />
            <span className="text-base font-normal text-basic-white">{videoCount}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PlaylistThumbnail
