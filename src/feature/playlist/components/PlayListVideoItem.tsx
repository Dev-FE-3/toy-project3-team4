import { usePlaylistStore } from '../stores/usePlaylistStore'
import { IVideo } from '../types/IPlayList'
import { EllipsisVertical } from 'lucide-react'

interface PlaylistVideoItemProps {
  video: IVideo
  index: number
}

const PlaylistVideoItem = ({ video, index }: PlaylistVideoItemProps) => {
  const { currentIndex, setCurrentIndex } = usePlaylistStore()
  const isActive = index === currentIndex

  return (
    <div
      id={`video-${index}`}
      className={`flex h-[132px] cursor-pointer items-start gap-[15px] px-[15px] py-[10px] ${isActive ? 'bg-gray-100' : ''}`}
      onClick={() => setCurrentIndex(index)}
    >
      {/* 썸네일 */}
      <img src={video.thumbnailUrl} alt={video.title} className="h-[112px] w-[180px] rounded-md object-cover" />

      {/* 텍스트 영역 */}
      <div className="flex flex-1 flex-col justify-between gap-[8px] overflow-hidden">
        <div className="flex items-start justify-between gap-[10px]">
          <h3 className="font-[Pretendard] text-[14px] font-medium leading-[20px] text-[#262729]">{video.title}</h3>
          <EllipsisVertical className="h-[14px] w-[14px] flex-shrink-0 text-gray-600" />
        </div>
        <p className="font-[Pretendard] text-[12px] font-medium leading-[16px] text-[#78787E]">
          조회수 {video.views.toLocaleString()}회 • {video.createdAt}
        </p>
      </div>
    </div>
  )
}

export default PlaylistVideoItem
