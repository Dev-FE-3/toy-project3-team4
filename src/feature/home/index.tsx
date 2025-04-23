import React from 'react'
import { useVideoList } from './api/useVideoList'
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll'
import VideoItem from './components/VideoItem'
import VideoItemSkeleton from './components/VideoItemSkeleton'
import { YouTubeVideoItem } from '@/shared/type/IYouTubeTypes'
import ModalManager from '@/shared/components/playlist-modal/ModalManager'
import { useVideoState } from './hooks/useVideoState'

const Home: React.FC = () => {
  const { videoId, handleVideoSelect } = useVideoState()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error } = useVideoList()

  useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    onLoadMore: fetchNextPage,
  })

  // 에러 처리 추후 수정 필요
  if (error) return <p>{(error as Error).message}</p>

  return (
    <>
      <ul className="flex min-h-screen flex-col items-center p-[15px]">
        {data?.pages.map((page) =>
          page.items.map((item: YouTubeVideoItem) => (
            <VideoItem key={typeof item.id === 'string' ? item.id : item.id.videoId} item={item} onVideoSelect={handleVideoSelect} />
          )),
        )}
        {isFetchingNextPage && <VideoItemSkeleton />}
      </ul>
      <ModalManager videoId={videoId} />
    </>
  )
}

export default Home
