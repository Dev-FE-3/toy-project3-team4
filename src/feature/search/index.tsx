import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll'
import { getSearchParams, isSearchPlaylistItem, updateSearchType } from './service/handleSearchParams'
import { YouTubeSearchPlaylistItem, YouTubeSearchVideoItem } from './type/ISearchResultItemTypes'
import useSearch from './api/useSearch'
import SearchTypeButtons from './components/SearchTypeButtons'
import SearchVideoItem from './components/SearchVideoItem'
import SearchPlayListItem from './components/SearchPlaylistItem'
import VideoItemSkeleton from '../home/components/VideoItemSkeleton'
import SearchType from './type/SearchType'

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { type, keyword } = getSearchParams(searchParams)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useSearch({ keyword, type })

  const handleTypeChange = useCallback(
    (newType: SearchType) => {
      updateSearchType(setSearchParams, newType, keyword)
    },
    [keyword, setSearchParams],
  )

  useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    onLoadMore: fetchNextPage,
  })

  if (error) return <p>{(error as Error).message}</p>

  const renderSkeletons = () => (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <VideoItemSkeleton key={index} />
      ))}
    </>
  )

  const renderSearchResults = () =>
    data?.pages.map((page) =>
      page.items.map((item: YouTubeSearchPlaylistItem | YouTubeSearchVideoItem) =>
        isSearchPlaylistItem(item) ? (
          <SearchPlayListItem key={item.id.playlistId} item={item} />
        ) : (
          <SearchVideoItem key={item.id.videoId} item={item} />
        ),
      ),
    )

  return (
    <>
      <SearchTypeButtons currentType={type} onTypeChange={handleTypeChange} />
      <ul className="flex min-h-screen flex-col items-center p-[15px]">{isLoading ? renderSkeletons() : renderSearchResults()}</ul>
    </>
  )
}

export default Search
