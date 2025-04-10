import { memo, useCallback } from 'react'
import useChannelInfo from '@/feature/home/api/useChannelInfo'
import usePlaylistInfo from '../api/usePlaylistInfo'
import usePlaylistVideos from '../api/usePlaylistVideos'
import createPlaylistFromYouTube from '../service/createPlaylistFromYouTube'
import PlaylistThumbnail from '@/shared/components/playlist/PlaylistThumnail'
import ChannelAvatar from '@/shared/components/video/ChannelAvatar'
import PlaylistInfo from '@/shared/components/playlist/PlaylistInfo'
import VideoItemSkeleton from '@/feature/home/components/VideoItemSkeleton'
import { YouTubeSearchPlaylistItem } from '../type/ISearchResultItemTypes'
import { Bookmark } from 'lucide-react'

interface SearchPlayListItemProps {
  item: YouTubeSearchPlaylistItem
}

const SearchPlayListItem = memo(({ item }: SearchPlayListItemProps) => {
  const { data: channelInfo, isLoading: isChannelLoading } = useChannelInfo(item.snippet.channelId)
  const { data: playlistInfo, isLoading: isPlaylistLoading } = usePlaylistInfo(item.id.playlistId)
  const { data: playlistVideos, refetch, isLoading: isVideoLoading } = usePlaylistVideos(item.id.playlistId)

  const channelThumbnail = channelInfo?.items?.[0]?.snippet?.thumbnails?.default?.url
  const videoCount = playlistInfo?.items?.[0]?.contentDetails?.itemCount
  const firstVideoId = playlistVideos?.items?.[0]?.snippet.resourceId.videoId

  const handleBookmarkClick = useCallback(async () => {
    const result = await refetch()

    if (result.data) {
      createPlaylistFromYouTube(result.data.items, item.snippet.title)
    }
  }, [refetch, item.snippet.title])

  // 비디오 정보가 로딩 중일 때는 스켈레톤 UI를 보여줌
  if (isChannelLoading || isPlaylistLoading || isVideoLoading) return <VideoItemSkeleton />

  // 채널 정보가 없거나 비디오 정보가 없으면 렌더링하지 않음
  if (!channelThumbnail || videoCount === undefined) return null

  return (
    <li className="mb-5 w-full">
      <PlaylistThumbnail
        videoId={firstVideoId}
        playlistId={item.id.playlistId}
        thumbnailUrl={item.snippet.thumbnails.high.url}
        videoCount={videoCount}
      />

      <div className="flex items-start gap-3">
        <ChannelAvatar channelId={item.snippet.channelId} channelThumbnail={channelThumbnail} />
        <PlaylistInfo videoId={firstVideoId} playlistId={item.id.playlistId} title={item.snippet.title} publishedAt={item.snippet.publishedAt} />

        {/* 북마크 버튼 바꾸기 */}
        <Bookmark size={20} className="cursor-pointer stroke-gray-dark" strokeWidth={1.5} onClick={() => handleBookmarkClick()} />
      </div>
    </li>
  )
})

export default SearchPlayListItem
