import React, { useEffect } from 'react'
import { YouTubeVideoItem } from './type/IVideoTypes'
import { YouTubePlaylistItem } from './type/IPlaylistTypes'
import VideoItem from './components/VideoItem'
import PlayListItem from './components/PlayListItem'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchYoutubePopularPlaylist, fetchYoutubePopularVideo } from '@/shared/util/youtube'

const Home: React.FC = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useInfiniteQuery({
    queryKey: ['fetchYoutubePopularVideo'],
    queryFn: fetchYoutubePopularVideo,
    getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
    initialPageParam: '',
    staleTime: 1000 * 60 * 5,
  })

  const {
    data: playlistData,
    fetchNextPage: fetchNextPlaylistPage,
    hasNextPage: hasNextPlaylistPage,
    isFetchingNextPage: isFetchingNextPlaylistPage,
    isLoading: isLoadingPlaylist,
    error: errorPlaylist,
  } = useInfiniteQuery({
    queryKey: ['fetchYoutubePopularPlaylist'],
    queryFn: fetchYoutubePopularPlaylist,
    getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
    initialPageParam: '',
    staleTime: 1000 * 60 * 5,
  })
  console.log(playlistData)

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const clientHeight = window.innerHeight

      if (scrollHeight - scrollTop <= clientHeight && !isFetchingNextPage && hasNextPage) {
        fetchNextPage()
        fetchNextPlaylistPage()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isFetchingNextPage, hasNextPage, fetchNextPage, isFetchingNextPlaylistPage, hasNextPlaylistPage, fetchNextPlaylistPage])

  // 로딩, 에러 처리 추후 수정 필요
  if (isLoading || isLoadingPlaylist) return <p>Loading...</p>
  if (error || errorPlaylist) return <p>{(error as Error).message}</p>

  return (
    <>
      <ul className="flex min-h-screen flex-col items-center justify-center p-[15px]">
        {playlistData?.pages.map((page) => page.items.map((item: YouTubePlaylistItem) => <PlayListItem key={item.id.playlistId} item={item} />))}
      </ul>
      <ul className="flex min-h-screen flex-col items-center justify-center p-[15px]">
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
