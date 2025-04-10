import { fetchYoutubeSearch } from '@/shared/util/youtube'
import { useInfiniteQuery } from '@tanstack/react-query'
import SearchType from '../type/ISearchType'

const useSearch = ({ keyword, type }: SearchType) => {
  return useInfiniteQuery({
    queryKey: ['youtubeSearch', keyword, type],
    queryFn: ({ pageParam = '' }) => fetchYoutubeSearch({ pageParam, searchParams: keyword, type }),
    getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
    initialPageParam: '',
    staleTime: 1000 * 60 * 5,
    enabled: !!keyword,
  })
}

export default useSearch
