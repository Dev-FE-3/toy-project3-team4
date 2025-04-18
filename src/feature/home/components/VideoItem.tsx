import { memo, useCallback } from 'react'
import { Bookmark } from 'lucide-react'
import { VideoItemProps } from '../type/IVideoTypes'
import useChannelInfo from '../api/useChannelInfo'
import VideoThumbnail from '@/shared/components/video/VideoThumnail'
import ChannelAvatar from '@/shared/components/video/ChannelAvatar'
import VideoInfo from '@/shared/components/video/VideoInfo'
import VideoItemSkeleton from './VideoItemSkeleton'
import MoreOptions from '@/shared/components/more-options/MoreOptions'
import { StyledIcon } from '@/shared/components/more-options/utils/icon'

const VideoItem = memo(({ item, onVideoSelect }: VideoItemProps) => {
  const { data: channelData, isLoading: isChannelLoading } = useChannelInfo(item.snippet.channelId)
  const channelThumbnail = channelData?.items[0]?.snippet?.thumbnails?.default?.url

  const handleBookmarkClick = useCallback(() => {
    onVideoSelect(typeof item.id === 'string' ? item.id : item.id.videoId)
  }, [item.id, onVideoSelect])

  const menuItems = [
    {
      icon: StyledIcon(Bookmark),
      label: '플레이리스트에 추가',
      onClick: handleBookmarkClick,
    },
  ]

  if (isChannelLoading) return <VideoItemSkeleton />

  return (
    <>
      <li className="mb-5 w-full">
        <VideoThumbnail videoId={typeof item.id === 'string' ? item.id : item.id.videoId} thumbnailUrl={item.snippet.thumbnails.high.url} />

        <div className="flex items-start gap-3">
          <ChannelAvatar channelId={item.snippet.channelId} channelThumbnail={channelThumbnail} />
          <VideoInfo
            videoId={typeof item.id === 'string' ? item.id : item.id.videoId}
            title={item.snippet.title}
            viewCount={Number(item.statistics.viewCount)}
            publishedAt={item.snippet.publishedAt}
          />
          <MoreOptions items={menuItems} />
        </div>
      </li>
    </>
  )
})

VideoItem.displayName = 'VideoItem'

export default VideoItem
