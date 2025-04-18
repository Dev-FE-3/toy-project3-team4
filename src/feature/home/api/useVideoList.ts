import { fetchYoutubePopularVideo } from '@/shared/util/youtube'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useVideoList = () => {
  return useInfiniteQuery({
    queryKey: ['fetchYoutubePopularVideo'],
    queryFn: fetchYoutubePopularVideo,
    getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
    initialPageParam: '',
    staleTime: 1000 * 60 * 5,
  })
}
