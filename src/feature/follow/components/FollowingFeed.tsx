import { FollowingChannel } from '../type/IFollowingTypes'
import useFollowingVideos from '../api/useFollowingVideos'
import VideoItemSkeleton from '@/feature/home/components/VideoItemSkeleton'
import VideoItem from '@/feature/home/components/VideoItem'
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll'
import { usePagination } from '../hooks/usePagination'
import ModalManager from '@/shared/components/playlist-modal/ModalManager'
import { useVideoState } from '@/feature/home/hooks/useVideoState'

interface FollowingFeedProps {
  channels: FollowingChannel[]
}

const ITEMS_PER_PAGE = 5

const FollowingFeed = ({ channels }: FollowingFeedProps) => {
  const { data: allVideos, isLoading: isLoadingVideos, isError } = useFollowingVideos(channels)
  const { videoId, handleVideoSelect } = useVideoState()

  const {
    currentData: videos,
    hasNextPage,
    loadMore,
  } = usePagination({
    data: allVideos || [],
    itemsPerPage: ITEMS_PER_PAGE,
  })

  useInfiniteScroll({
    hasNextPage,
    isLoading: isLoadingVideos,
    onLoadMore: loadMore,
  })

  if (isError) return <div>죄송합니다, 오류가 발생했습니다</div>

  if (isLoadingVideos) {
    return (
      <ul className="mx-[15px]">
        {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
          <VideoItemSkeleton key={index} />
        ))}
      </ul>
    )
  }

  return (
    <>
      <ul className="mx-[15px]">
        {videos.map((video) => (
          <VideoItem key={video.id.videoId} item={video} onVideoSelect={handleVideoSelect} />
        ))}
      </ul>
      <ModalManager videoId={videoId} />
    </>
  )
}

export default FollowingFeed
