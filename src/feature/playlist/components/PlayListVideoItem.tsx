import { IVideoItemProps } from '../types/IPlayList'
import { EllipsisVertical } from 'lucide-react'
import { formatViewCount, formatUploadDate } from '@/shared/util/format'
import '../util/scroll.css'
import useYoutubeVideoInfo from '../api/useYoutubeVideoInfo'

const PlaylistVideoItem = ({ title, thumbnailUrl, videoId, onClick, isActive }: Omit<IVideoItemProps, 'views' | 'createdAt'>) => {
  const { data: videoData } = useYoutubeVideoInfo(videoId)
  const views = videoData?.items[0]?.statistics?.viewCount ?? null
  const createdAt = videoData?.items[0]?.snippet?.publishedAt ?? null

  return (
    <div
      className={`scrollbar-hide flex h-[132px] cursor-pointer items-start gap-[15px] px-[15px] py-[10px] ${isActive ? 'bg-gray-light' : ''}`}
      onClick={onClick}
    >
      {/* 썸네일 */}
      <img src={thumbnailUrl} alt={title} className="h-[112px] w-[180px] rounded-md object-cover" />

      {/* 텍스트 영역 */}
      <div className="flex flex-1 flex-col justify-between gap-[8px] overflow-hidden">
        <div className="flex items-start justify-between gap-[10px]">
          <h3 className="overflow-hidden truncate whitespace-nowrap text-[14px] font-medium leading-[20px]">{title}</h3>
          <EllipsisVertical size={14} className="flex-shrink-0 stroke-gray-dark" />
        </div>
        <p className="text-[12px] font-medium leading-[16px] text-gray-medium-dark">
          {views && createdAt && `조회수 ${formatViewCount(views)} • ${formatUploadDate(createdAt)}`}
        </p>
      </div>
    </div>
  )
}

export default PlaylistVideoItem
