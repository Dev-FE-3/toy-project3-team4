import { useSearchParams } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from '@/shared/lib/shadcn/ui/button'
import { Bookmark, Share2 } from 'lucide-react'
import FollowButton from './components/FollowButton'
import CommentContainer from './components/CommentContainer'
import LikeButton from './components/LikeButton'
import { useAuthStore } from '@/shared/store/auth/useAuthStore'
import VideoDetailPage from '../playlist/components/VideoDetailPage'
import { formatUploadDate, formatViewCount } from '@/shared/util/format'
import { useVideoDetail } from './service/useVideoDetail'
import { usePlayListModalStore } from '@/shared/store/modal/usePlayListModalStore'
import ModalManager from '@/shared/components/playlist-modal/ModalManager'

const Video: React.FC = () => {
  const [searchParams] = useSearchParams()

  const openPlayList = usePlayListModalStore((state) => state.openPlayList)
  const videoId = searchParams.get('video') ?? ''
  const playListId = searchParams.get('playlist') ?? ''
  const isMyPlayList = searchParams.get('myself') ?? false

  const user = useAuthStore((state) => state.user) || { id: 0 }

  const { data: video, isLoading, error } = useVideoDetail(videoId)

  if (isLoading) return <></>
  if (error || !video) return <></>

  return (
    <article className="aspect-video w-full">
      <section>
        <iframe
          height="240"
          className="w-full border-0"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </section>

      <header className="px-[15px] pt-[15px] font-bold">{video.title}</header>

      <p className="px-[15px] pb-[8px] pt-[8px] text-xs">
        <span>조회수 {formatViewCount(video.viewCount)} • </span>
        <time dateTime={video.publishedAt}>{formatUploadDate(video.publishedAt)}</time>
      </p>

      <section className="flex items-center justify-between px-[15px]">
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage className="rounded-full border border-gray-medium object-cover" src={video.channelImg} />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
          <h1>{video.channelTitle}</h1>
        </div>

        <FollowButton userId={user.id} channelId={video.channelId} />
      </section>

      <section className="flex gap-[10px] px-[15px] py-[16px] pb-[12px]">
        <LikeButton videoId={videoId} userId={user.id} />
        <Button className="rounded-full bg-gray-light px-[9px] py-[7px] text-xs text-gray-dark">
          <Share2 fill="#525252" />
          공유
        </Button>
        <Button onClick={openPlayList} className="rounded-full bg-gray-light px-[9px] py-[7px] text-xs text-gray-dark">
          <Bookmark />
          저장
        </Button>
      </section>

      {/* ✅ 댓글 */}
      <CommentContainer id={videoId} />
      {playListId && <VideoDetailPage videoId={videoId} playListId={playListId} myself={isMyPlayList === 'true'} />}
      <ModalManager videoId={videoId} />
    </article>
  )
}
export default Video
