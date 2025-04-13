import { memo, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useChannelInfo from '@/feature/home/api/useChannelInfo'
import usePlaylistInfo from '../api/usePlaylistInfo'
import usePlaylistVideos from '../api/usePlaylistVideos'
import createPlaylistFromYouTube from '../api/createPlaylistFromYouTube'
import PlaylistThumbnail from '@/shared/components/playlist/PlaylistThumnail'
import ChannelAvatar from '@/shared/components/video/ChannelAvatar'
import PlaylistInfo from '@/shared/components/playlist/PlaylistInfo'
import VideoItemSkeleton from '@/feature/home/components/VideoItemSkeleton'
import { YouTubeSearchPlaylistItem } from '../type/ISearchResultItemTypes'
import { Bookmark } from 'lucide-react'
import Alert from '@/shared/components/alert/Alert'
import { useAuthStore } from '@/shared/store/auth/useAuthStore'

interface SearchPlayListItemProps {
  item: YouTubeSearchPlaylistItem
}

const SearchPlayListItem = memo(({ item }: SearchPlayListItemProps) => {
  const navigate = useNavigate()
  const [alertInfo, setAlertInfo] = useState<{
    title: string
    description: string
    hideCancelButton?: boolean
    onConfirm?: () => void
    onCancel?: () => void
  } | null>(null)

  const { data: channelInfo, isLoading: isChannelLoading } = useChannelInfo(item.snippet.channelId)
  const { data: playlistInfo, isLoading: isPlaylistLoading } = usePlaylistInfo(item.id.playlistId)
  const { data: playlistVideos, refetch, isLoading: isVideoLoading } = usePlaylistVideos(item.id.playlistId)

  const channelThumbnail = channelInfo?.items?.[0]?.snippet?.thumbnails?.default?.url
  const videoCount = playlistInfo?.items?.[0]?.contentDetails?.itemCount
  const firstVideoId = playlistVideos?.items?.[0]?.snippet.resourceId.videoId

  const handleBookmarkClick = useCallback(async () => {
    setAlertInfo({
      title: '플레이리스트 저장',
      description: '이 플레이리스트를 저장하시겠습니까?',
      hideCancelButton: false,
      onConfirm: async () => {
        const result = await refetch()

        if (result.data) {
          const user = useAuthStore.getState().user
          if (user) {
            const response = await createPlaylistFromYouTube(result.data.items, item.snippet.title, user.id)
            setAlertInfo({
              title: '안내',
              description: response.message,
            })
          } else {
            setAlertInfo({
              title: '안내',
              description: '로그인 후 이용해주세요.',
              onConfirm: () => {
                navigate('/login')
              },
            })
          }
        }
      },
      onCancel: () => {
        setAlertInfo(null)
      },
    })
  }, [refetch, item.snippet.title, navigate])

  // 비디오 정보가 로딩 중일 때는 스켈레톤 UI를 보여줌
  if (isChannelLoading || isPlaylistLoading || isVideoLoading) return <VideoItemSkeleton />

  // 채널 정보가 없거나 비디오 정보가 없으면 렌더링하지 않음
  if (!channelThumbnail || videoCount === undefined) return null

  const mainElement = document.querySelector('#view-container') as HTMLElement

  return (
    <>
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

          <Bookmark size={20} className="cursor-pointer stroke-gray-dark" strokeWidth={1.5} onClick={handleBookmarkClick} />
        </div>
      </li>
      {alertInfo && mainElement && (
        <Alert
          container={mainElement}
          title={alertInfo.title}
          description={alertInfo.description}
          hideCancelButton={alertInfo.hideCancelButton}
          onConfirm={() => {
            alertInfo.onConfirm?.()
            setAlertInfo(null)
          }}
          onCancel={() => setAlertInfo(null)}
        />
      )}
    </>
  )
})

export default SearchPlayListItem
