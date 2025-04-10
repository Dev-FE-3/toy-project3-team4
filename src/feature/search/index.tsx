import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useInfiniteScroll } from '../home/hooks/useInfiniteScroll'
import { getSearchParams, isSearchPlaylistItem, updateSearchType } from './service/handleSearchParams'
import { YouTubeSearchPlaylistItem, YouTubeSearchVideoItem } from './type/ISearchResultItemTypes'
import SearchTypeEnum from './type/SearchTypeEnum'
import useSearch from './api/useSearch'
import SearchTypeButtons from './components/SearchTypeButtons'
import SearchVideoItem from './components/SearchVideoItem'
import SearchPlayListItem from './components/SearchPlaylistItem'
import VideoItemSkeleton from '../home/components/VideoItemSkeleton'

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { type, keyword } = getSearchParams(searchParams)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useSearch({ keyword, type })

  const handleTypeChange = useCallback(
    (newType: SearchTypeEnum) => {
      updateSearchType(setSearchParams, newType, keyword)
    },
    [keyword, setSearchParams],
  )

  useInfiniteScroll({
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
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
