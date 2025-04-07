import React from 'react'
import { IVideo } from '../types/IPlayList'
import { usePlaylistStore } from '../stores/usePlaylistStore.ts'

const PlaylistVideoItem: React.FC<{ video: IVideo; index: number }> = ({ video, index }) => {
  const { currentIndex, setCurrentIndex } = usePlaylistStore()
  const isActive = index === currentIndex

  return (
    <div className={`flex cursor-pointer gap-3 px-4 py-2 ${isActive ? 'bg-gray-100' : ''}`} onClick={() => setCurrentIndex(index)}>
      <img src={video.thumbnailUrl} className="h-[60px] w-[100px] rounded-md object-cover" />
      <div>
        <p className="text-sm font-semibold">{video.title}</p>
        <p className="text-xs text-gray-500">조회수 {video.views.toLocaleString()}회</p>
      </div>
    </div>
  )
}

export default PlaylistVideoItem
