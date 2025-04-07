import { IDetailedVideoProps } from '../type/IVideo'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from '@/shared/lib/shadcn/ui/button'
import { Bookmark, Heart, Share2 } from 'lucide-react'
import { formatLikeCount, formatTimeAgo, formatViewCount } from '../service/formatters'
import CommentContainer from './CommentContainer'
import { useYoutubeVideoInfo } from '../api/useYoutubeVideoInfo'
import { useYoutubeChannel } from '../api/useYoutubeChannel'
import { useAuthStore } from '@/shared/store/auth/useAuthStore'
import FollowButton from './FollowButton'

const DetailedVideo: React.FC<IDetailedVideoProps> = ({ id }) => {
  const { data: video, isLoading: isVideoLoading, error: videoError } = useYoutubeVideoInfo(id)

  const channelId = video?.items?.[0]?.snippet?.channelId

  console.log(channelId)

  // 전역으로 저장된 유저 정보 가져오기
  // const user = useAuthStore((state) => state.user)
  // const userId = useAuthStore((state) => state.user_id)
  const userId = 19

  const { data: channel, isLoading: isChannelLoading, error: channelError } = useYoutubeChannel(channelId)

  const saveButton = () => {
    // 재생목록에 영상 저장
    console.log('저장 버튼 클릭!')
  }

  if (isVideoLoading || isChannelLoading) return <div>Loading...</div>
  if (videoError || channelError) return <div>Error</div>

  const videoChannelTitle = video.items[0].snippet.channelTitle
  const videoChannelImg = channel.items[0].snippet.thumbnails.default.url

  const videoTitle = video.items[0].snippet.localized.title
  const videoViewCount = Number(video.items[0].statistics.viewCount)
  const videoLikeCount = Number(video.items[0].statistics.likeCount)
  const videoPublishedAt = video.items[0].snippet.publishedAt

  return (
    <article className="aspect-video w-full">
      <section>
        <iframe
          height="240"
          className="w-full border-0"
          src={`https://www.youtube.com/embed/${id}`}
          title={videoTitle}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </section>

      <header className="px-[15px] pt-[15px] font-bold">{videoTitle}</header>

      <p className="px-[15px] pb-[8px] pt-[8px] text-xs">
        <span>조회수 {formatViewCount(videoViewCount)}회 • </span>
        <time dateTime={videoPublishedAt}>{formatTimeAgo(videoPublishedAt)}</time>
      </p>

      <section className="flex items-center justify-between px-[15px]">
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage className="rounded-full border border-gray-medium object-cover" src={videoChannelImg} />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
          <h1>{videoChannelTitle}</h1>
        </div>

        <FollowButton userId={userId} channelId={channelId} />
      </section>

      <section className="flex gap-[10px] px-[15px] py-[8px]">
        <Button className="h-[30px] w-[74px] rounded-full bg-gray-light px-[9px] py-[7px] text-xs text-gray-dark">
          <Heart />
          {formatLikeCount(videoLikeCount)}
        </Button>
        <Button className="h-[30px] w-[62px] rounded-full bg-gray-light px-[9px] py-[7px] text-xs text-gray-dark">
          <Share2 fill="#525252" />
          공유
        </Button>
        <Button onClick={saveButton} className="h-[30px] w-[62px] rounded-full bg-gray-light px-[9px] py-[7px] text-xs text-gray-dark">
          <Bookmark />
          저장
        </Button>
      </section>

      {/* ✅ 댓글 */}
      <CommentContainer id={id} />
    </article>
  )
}

export default DetailedVideo
