import React from 'react'
import { useVideoList } from './api/useVideoList'
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll'
import { YouTubeVideoItem } from './type/IVideoTypes'
import VideoItem from './components/VideoItem'
import VideoItemSkeleton from './components/VideoItemSkeleton'

const Home: React.FC = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error } = useVideoList()

  useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    onLoadMore: fetchNextPage,
  })

  // 에러 처리 추후 수정 필요
  if (error) return <p>{(error as Error).message}</p>

  return (
    <ul className="flex min-h-screen flex-col items-center p-[15px]">
      {data?.pages.map((page) => page.items.map((item: YouTubeVideoItem) => <VideoItem key={item.id} item={item} />))}
      {isFetchingNextPage && <VideoItemSkeleton />}
    </ul>
  )
}

export default Home
