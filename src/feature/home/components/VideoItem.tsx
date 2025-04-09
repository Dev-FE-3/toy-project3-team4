import React from 'react'
import { Bookmark } from 'lucide-react'
import { VideoItemProps } from '../type/IVideoTypes'
import useChannelInfo from '../api/useChannelInfo'
import VideoThumbnail from '@/shared/components/video/VideoThumnail'
import ChannelAvatar from '@/shared/components/video/ChannelAvatar'
import VideoInfo from '@/shared/components/video/VideoInfo'
import VideoItemSkeleton from './VideoItemSkeleton'

const VideoItem = React.memo(({ item }: VideoItemProps) => {
  const { data: channelData, isLoading: isChannelLoading } = useChannelInfo(item.snippet.channelId)
  const channelThumbnail = channelData?.items[0]?.snippet?.thumbnails?.default?.url

  const handleBookmarkClick = React.useCallback(() => {
    console.log('bookmark clicked')
  }, [])

  if (isChannelLoading) return <VideoItemSkeleton />

  return (
    <li className="mb-5 w-full">
      <VideoThumbnail videoId={item.id} thumbnailUrl={item.snippet.thumbnails.high.url} />

      <div className="flex items-start gap-3">
        <ChannelAvatar channelId={item.snippet.channelId} channelThumbnail={channelThumbnail} />
        <VideoInfo
          videoId={item.id}
          title={item.snippet.title}
          viewCount={Number(item.statistics.viewCount)}
          publishedAt={item.snippet.publishedAt}
        />
        {/* 버튼 바꾸기 */}
        <Bookmark size={20} className="cursor-pointer stroke-gray-dark" strokeWidth={1.5} onClick={handleBookmarkClick} />
      </div>
    </li>
  )
})

VideoItem.displayName = 'VideoItem'

export default VideoItem
