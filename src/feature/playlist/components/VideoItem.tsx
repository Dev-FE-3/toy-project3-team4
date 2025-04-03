import React from 'react'
import { IVideoItem } from '../type/IvideoItem'
import { EllipsisVertical } from 'lucide-react'

const VideoItem: React.FC<IVideoItem> = ({ thumbnail, title, views, uploadedTime }) => {
  return (
    <div className="flex h-[132px] items-start gap-[15px] bg-white px-[15px] py-[10px]">
      {/* 썸네일 */}
      <img src={thumbnail} alt="Video Thumbnail" className="h-[112px] w-[180px] flex-shrink-0 rounded-[5px] object-cover" />

      {/* 영상 정보 */}
      <div className="flex flex-1 flex-col items-start gap-2 self-stretch bg-white">
        {/* 완료 */}
        <div className="flex items-start justify-between gap-[10px]">
          <h3 className="font-[Pretendard] text-[14px] font-medium leading-[20px] text-[#262729]">{title}</h3>
          <EllipsisVertical className="#2D3648 cursor-pointer" />
        </div>
        <p className="font-[Pretendard] text-[12px] font-medium leading-[16px] text-[#78787E]">
          조회수 {views.toLocaleString()}회 • {uploadedTime}
        </p>
      </div>
    </div>
  )
}

export default VideoItem
