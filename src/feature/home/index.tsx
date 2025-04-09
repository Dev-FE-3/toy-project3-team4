import React from 'react'
import { useVideoList } from './api/useVideoList'
import { useInfiniteScroll } from './hooks/useInfiniteScroll'
import { YouTubeVideoItem } from './type/IVideoTypes'
import VideoItem from './components/VideoItem'
import HomeSkeleton from './components/HomeSkeleton'

const Home: React.FC = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error } = useVideoList()

  useInfiniteScroll({
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  })

  // 에러 처리 추후 수정 필요
  if (error) return <p>{(error as Error).message}</p>

  return (
    <ul className="flex min-h-screen flex-col items-center p-[15px]">
      {data?.pages.map((page) => page.items.map((item: YouTubeVideoItem) => <VideoItem key={item.id} item={item} />))}
      {isFetchingNextPage && (
        <li className="mb-5 w-full">
          <HomeSkeleton />
        </li>
      )}
    </ul>
  )
}

export default Home
