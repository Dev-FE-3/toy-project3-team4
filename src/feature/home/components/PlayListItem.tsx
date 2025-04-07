import { Avatar, AvatarImage } from '@/shared/lib/shadcn/ui/avatar'
import { Bookmark, ListVideo } from 'lucide-react'
import { fetchYoutubeChannel, fetchYoutubePlayListInfo, fetchYoutubePlayListVideoInfo } from '@/shared/util/youtube'
import { formatUploadDate } from '@/shared/util/format'
import { PlaylistItemProps, PlaylistVideoItem } from '../type/IPlaylistTypes'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

const PlayListItem: React.FC<PlaylistItemProps> = ({ item }) => {
  const { data: channelData } = useQuery({
    queryKey: ['fetchYoutubeChannel', item.snippet.channelId],
    queryFn: () => fetchYoutubeChannel(item.snippet.channelId),
    enabled: !!item.snippet.channelId,
    staleTime: 1000 * 60 * 5,
  })

  const { data: playlistData } = useQuery({
    queryKey: ['fetchYoutubePlayListInfo', item.id.playlistId],
    queryFn: () => fetchYoutubePlayListInfo(item.id.playlistId),
    enabled: !!item.id.playlistId,
    staleTime: 1000 * 60 * 5,
  })

  const { refetch } = useQuery({
    queryKey: ['fetchYoutubePlayListVideoInfo', item.id.playlistId],
    queryFn: () => fetchYoutubePlayListVideoInfo(item.id.playlistId),
    enabled: false, // 북마크 클릭 시에만 데이터를 가져오도록 설정
    staleTime: 1000 * 60 * 5,
  })

  const channelThumbnail = channelData?.items?.[0]?.snippet?.thumbnails?.default?.url
  const videoCount = playlistData?.items?.[0]?.contentDetails?.itemCount || 0

  const handleBookmarkClick = async () => {
    const result = await refetch()
    console.log('재생목록 비디오 정보:', result.data)
    result.data.items.map((item: PlaylistVideoItem) => {
      console.log(item.snippet.resourceId.videoId)
    })
  }

  return (
    <li className="mb-5 w-full">
      {/* 동영상 썸네일 */}
      <Link to={`/video/${item.id.playlistId}`}>
        <div className="mb-[14px] flex h-full w-full flex-col items-center justify-center">
          <div className="h-3 w-[375px] rounded-tl-[10px] rounded-tr-[10px] bg-[#E0E0E2]"></div>
          <div className="relative">
            <img
              className="aspect-video h-full w-full rounded-[10px] object-cover shadow-[0px_-1px_4px_0px_rgba(0,0,0,0.25)]"
              src={item.snippet.thumbnails.high.url}
              alt={item.snippet.title}
            />
            <div className="absolute bottom-5 right-5 flex items-center gap-1 rounded-full bg-black/40 px-[12px] py-[3px]">
              <ListVideo size={20} className="stroke-basic-white" strokeWidth={2} />
              <span className="text-base font-normal text-basic-white">{videoCount}</span>
            </div>
          </div>
        </div>
      </Link>

      <div className="flex items-start gap-3">
        {/* 채널 프로필 이미지 */}
        <Link to={`/channel/${item.snippet.channelId}`}>
          <Avatar className="h-9 w-9">
            <AvatarImage className="rounded-full border border-gray-medium object-cover" src={channelThumbnail} alt={item.snippet.channelTitle} />
          </Avatar>
        </Link>

        {/* 동영상 제목, 조회수, 업로드 날짜 */}
        <div className="flex flex-1 flex-col gap-1">
          <Link to={`/video/${item.id.playlistId}`} className="line-clamp-2 text-base font-medium">
            {item.snippet.title}
          </Link>
          <div className="text-sm font-light text-gray-medium-dark">
            <span>{formatUploadDate(item.snippet.publishedAt)}</span>
          </div>
        </div>

        {/* 북마크 버튼 */}
        <Bookmark size={20} className="cursor-pointer stroke-gray-dark" strokeWidth={1.5} onClick={() => handleBookmarkClick()} />
      </div>
    </li>
  )
}

export default PlayListItem
