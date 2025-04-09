import { X } from 'lucide-react'
import { IPlaylistHeaderProps } from '../types/IPlayList'

const PlaylistHeader = ({ playlistTitle, channelTitle, videoCount }: IPlaylistHeaderProps) => {
  return (
    <div className="flex items-start justify-between border-b bg-white p-[15px]">
      {/* 텍스트 정보 */}
      <div className="flex flex-col items-start gap-[3px]">
        {/* 제목 */}
        <h2 className="w-[308px] truncate text-base font-semibold leading-[28px] text-[#262729]">
          {playlistTitle} (/{videoCount})
        </h2>

        {/* 공개여부 + 채널명 */}
        <div className="flex items-center gap-[6px] text-xs font-normal text-[#78787E]">
          <span className="font-[Pretendard]">{channelTitle}</span>
          {/*{isPublic ? <Globe className="h-[12px] w-[12px] text-[#78787E]" /> : <Lock className="h-[12px] w-[12px] text-[#78787E]" />} */}
        </div>
      </div>

      {/* 닫기 버튼 */}
      <button onClick={close} className="text-gray-500 hover:text-black">
        <X size={20} />
      </button>
    </div>
  )
}

export default PlaylistHeader
