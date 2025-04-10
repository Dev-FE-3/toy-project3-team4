import { memo, useCallback } from 'react'
import useVideoInfo from '../api/useVideoInfo'
import useChannelInfo from '@/feature/home/api/useChannelInfo'
import VideoThumbnail from '@/shared/components/video/VideoThumnail'
import ChannelAvatar from '@/shared/components/video/ChannelAvatar'
import VideoInfo from '@/shared/components/video/VideoInfo'
import VideoItemSkeleton from '@/feature/home/components/VideoItemSkeleton'
import { YouTubeSearchVideoItem } from '../type/ISearchResultItemTypes'
import { Bookmark } from 'lucide-react'

interface SearchVideoItemProps {
  item: YouTubeSearchVideoItem
}

const SearchVideoItem = memo(({ item }: SearchVideoItemProps) => {
  const { data: channelData, isLoading: isChannelLoading } = useChannelInfo(item.snippet.channelId)
  const { data: videoData, isLoading: isVideoLoading } = useVideoInfo(item.id.videoId)

  const channelThumbnail = channelData?.items[0]?.snippet?.thumbnails?.default?.url

  const handleBookmarkClick = useCallback(() => {
    console.log('bookmark clicked')
  }, [])

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
        <Bookmark size={20} className="cursor-pointer stroke-gray-dark" strokeWidth={1.5} onClick={handleBookmarkClick} />
      </div>
    </li>
  )
})

export default SearchVideoItem
