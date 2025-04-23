import { X, Globe, Lock } from 'lucide-react'
import { IPlaylistHeaderProps } from '../types/IPlayList'

const PlaylistHeader = ({ playlistTitle, channelTitle, myself, isPublic, onClose }: IPlaylistHeaderProps) => {
  return (
    <div className="flex items-start justify-between border-b p-[15px]">
      {/* 텍스트 정보 */}
      <div className="flex flex-col items-start gap-[3px]">
        {/* 제목 */}
        <h2 className="line-clamp-2 max-w-[300px] text-lg font-semibold text-gray-dark">{playlistTitle}</h2>

        {/* 공개여부 + 채널명 */}
        <div className="flex items-center gap-[6px] text-xs font-normal text-gray-medium-dark">
          <span>{channelTitle}</span>
          {myself && (isPublic ? <Globe size={12} className="text-gray-medium-dark" /> : <Lock size={12} className="text-gray-medium-dark" />)}
        </div>
      </div>

      {/* 닫기 버튼 */}
      <button onClick={onClose} className="text-gray-medium-dark hover:text-black">
        <X size={18} />
      </button>
    </div>
  )
}

export default PlaylistHeader
