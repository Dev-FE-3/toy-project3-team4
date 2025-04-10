import { SetURLSearchParams } from 'react-router-dom'
import { YouTubeSearchPlaylistItem, YouTubeSearchVideoItem } from '../type/ISearchResultItemTypes'

export type SearchType = 'video' | 'playlist'

export const getSearchParams = (searchParams: URLSearchParams) => {
  const keyword = searchParams.get('q') || ''
  const type = (searchParams.get('type') || 'video') as SearchType

  return { keyword, type }
}

export const updateSearchType = (setSearchParams: SetURLSearchParams, newType: SearchType, currentKeyword: string) => {
  setSearchParams({ type: newType, q: currentKeyword })
}

export const isSearchPlaylistItem = (item: YouTubeSearchPlaylistItem | YouTubeSearchVideoItem): item is YouTubeSearchPlaylistItem => {
  return 'playlistId' in item.id
}

export const isSearchVideoItem = (item: YouTubeSearchPlaylistItem | YouTubeSearchVideoItem): item is YouTubeSearchVideoItem => {
  return 'videoId' in item.id
}
