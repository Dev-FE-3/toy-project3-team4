import { usePlaylistStore } from '@/shared/store/playlist/usePlaylistStore'
import { IPlaylistVideoItemProps } from '../types/IPlayList'
import { EllipsisVertical } from 'lucide-react'
import { formatViewCount, formatUploadDate } from '@/shared/util/format'
import '../util/scroll.css'

const PlaylistVideoItem = ({ video, index }: IPlaylistVideoItemProps) => {
  const { currentIndex, setCurrentIndex } = usePlaylistStore()
  const isActive = index === currentIndex

  return (
    <div
      id={`video-${index}`}
      className={`scrollbar-hide flex h-[132px] cursor-pointer items-start gap-[15px] px-[15px] py-[10px] ${isActive ? 'bg-gray-light' : ''}`}
      onClick={() => setCurrentIndex(index)}
    >
      {/* 썸네일 */}
      <img src={video.thumbnailUrl} alt={video.title} className="h-[112px] w-[180px] rounded-md object-cover" />

      {/* 텍스트 영역 */}
      <div className="flex flex-1 flex-col justify-between gap-[8px] overflow-hidden">
        <div className="flex items-start justify-between gap-[10px]">
          <h3 className="text-[14px] font-medium leading-[20px]">{video.title}</h3>
          <EllipsisVertical size={14} className="flex-shrink-0 stroke-gray-dark" />
        </div>
        <p className="text-[12px] font-medium leading-[16px] text-gray-medium-dark">
          조회수 {formatViewCount(video.views)} • {formatUploadDate(video.createdAt)}
        </p>
      </div>
    </div>
  )
}

export default PlaylistVideoItem
