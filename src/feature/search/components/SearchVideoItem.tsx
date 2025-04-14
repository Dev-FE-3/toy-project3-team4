import { memo, useCallback } from 'react'
import useVideoInfo from '../api/useVideoInfo'
import useChannelInfo from '@/feature/home/api/useChannelInfo'
import VideoThumbnail from '@/shared/components/video/VideoThumnail'
import ChannelAvatar from '@/shared/components/video/ChannelAvatar'
import VideoInfo from '@/shared/components/video/VideoInfo'
import VideoItemSkeleton from '@/feature/home/components/VideoItemSkeleton'
import { YouTubeSearchVideoItem } from '../type/ISearchResultItemTypes'
import { Bookmark } from 'lucide-react'
import MoreOptions from '@/shared/components/more-options/MoreOptions'

interface SearchVideoItemProps {
  item: YouTubeSearchVideoItem
  onVideoSelect: (videoId: string) => void
}

const SearchVideoItem = memo(({ item, onVideoSelect }: SearchVideoItemProps) => {
  const { data: channelData, isLoading: isChannelLoading } = useChannelInfo(item.snippet.channelId)
  const { data: videoData, isLoading: isVideoLoading } = useVideoInfo(item.id.videoId)

  const channelThumbnail = channelData?.items[0]?.snippet?.thumbnails?.default?.url

  const handleBookmarkClick = useCallback(() => {
    onVideoSelect(item.id.videoId)
  }, [item.id.videoId, onVideoSelect])

  const menuItems = [
    {
      icon: <Bookmark size={20} className="cursor-pointer stroke-gray-dark" strokeWidth={1.5} />,
      label: '플레이리스트에 추가',
      onClick: handleBookmarkClick,
    },
  ]

  // 비디오 정보가 로딩 중일 때는 스켈레톤 UI를 보여줌
  if (isChannelLoading || isVideoLoading) return <VideoItemSkeleton />

  // 채널 정보가 없거나 비디오 정보가 없으면 렌더링하지 않음
  if (!channelThumbnail || !videoData?.items[0]?.statistics.viewCount) return null

  return (
    <li className="mb-5 w-full">
      <VideoThumbnail videoId={item.id.videoId} thumbnailUrl={item.snippet.thumbnails.high.url} />

      <div className="flex items-start gap-3">
        <ChannelAvatar channelId={item.snippet.channelId} channelThumbnail={channelThumbnail} />
        <VideoInfo
          videoId={item.id.videoId}
          title={item.snippet.title}
          viewCount={videoData.items[0].statistics.viewCount}
          publishedAt={item.snippet.publishedAt}
        />
        <MoreOptions items={menuItems} />
      </div>
    </li>
  )
})

export default SearchVideoItem
