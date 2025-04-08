import React from 'react'
import { YouTubeVideoItem } from './type/IVideoTypes'
import VideoItem from './components/VideoItem'
import { useVideoList } from './api/useVideoList'
import { useInfiniteScroll } from './hooks/useInfiniteScroll'

const Home: React.FC = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useVideoList()

  useInfiniteScroll({
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  })

  // 로딩, 에러 처리 추후 수정 필요
  if (isLoading) return <p>Loading...</p>
  if (error) return <p>{(error as Error).message}</p>

  return (
    <>
      <ul className="flex min-h-screen flex-col items-center p-[15px]">
        {data?.pages.map((page) => page.items.map((item: YouTubeVideoItem) => <VideoItem key={item.id} item={item} />))}
        {isFetchingNextPage && (
          <li className="w-full py-4 text-center">
            <p>더 많은 동영상을 불러오는 중...</p>
          </li>
        )}
      </ul>
    </>
  )
}

export default Home
