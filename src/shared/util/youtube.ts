import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import axios from 'axios'

const YOUTUBE_KEY = import.meta.env.VITE_YOUTUBE_KEY

/**
 * 유튜브 비디오 ID를 통해 정보를 가져옵니다.
 */
export const useYoutubeVideoInfo = (videoId: string) => {
  const fetchYoutubeVideoInfo = async (videoId: string) => {
    const response = await axios.get(`/api/youtube/videos?part=snippet,statistics&id=${videoId}&key=${YOUTUBE_KEY}`)
    return response.data
  }

  return useQuery({
    queryKey: ['youtubeVideo', videoId], // 캐시 키
    queryFn: () => fetchYoutubeVideoInfo(videoId),
    enabled: !!videoId,
    staleTime: 1000 * 60 * 5,
  })
}

/**
 * 유튜브 재생목록 제목과 정보를 가져옵니다
 */
export const useYoutubePlayListInfo = (playListId: string) => {
  const fetchYoutubePlayListInfo = async (playListId: string) => {
    const response = await axios.get(`/api/youtube/playlists?part=snippet,contentDetails&id=${playListId}&key=${YOUTUBE_KEY}`)
    return response.data
  }
  return useQuery({
    queryKey: ['youtubePlayList', playListId], // 캐시 키
    queryFn: () => fetchYoutubePlayListInfo(playListId),
    enabled: !!playListId,
    staleTime: 1000 * 60 * 5,
  })
}

/**
 * 유튜브 재생목록 안의 비디오 정보를 가져옵니다
 */
export const useYoutubePlayListVideoInfo = (playListId: string) => {
  const fetchYoutubePlayListVideoInfo = async (playListId: string) => {
    const response = await axios.get(`/api/youtube/playlistItems?part=snippet&playlistId=${playListId}&maxResults=10&key=${YOUTUBE_KEY}`)
    return response.data
  }
  return useQuery({
    queryKey: ['youtubePlayListVideo', playListId], // 캐시 키
    queryFn: () => fetchYoutubePlayListVideoInfo(playListId),
    enabled: !!playListId,
    staleTime: 1000 * 60 * 5,
  })
}

/**
 * 유튜브 검색 API (동영상,재생목록,채널 등 모든 정보가 나옵니다)
 */
export const useYoutubeSearch = (search: string) => {
  const fetchYoutubeSearchResult = async (search: string) => {
    const response = await axios.get(`/api/youtube/search?part=snippet&q=${search}&key=${YOUTUBE_KEY}`)
    return response.data
  }
  return useQuery({
    queryKey: ['YoutubeSearchResult', search], // 캐시 키
    queryFn: () => fetchYoutubeSearchResult(search),
    enabled: !!search,
    staleTime: 1000 * 60 * 5,
  })
}

/**
 * 유튜브 채널 정보를 가져옵니다.
 */
export const useYoutubeChannel = (channel: string) => {
  const fetchYoutubeChannel = async (channel: string) => {
    const response = await axios.get(`/api/youtube/channels?part=snippet,statistics,brandingSettings&id=${channel}&key=${YOUTUBE_KEY}`)
    return response.data
  }
  return useQuery({
    queryKey: ['fetchYoutubeChannel', channel], // 캐시 키
    queryFn: () => fetchYoutubeChannel(channel),
    enabled: !!channel,
    staleTime: 1000 * 60 * 5,
  })
}

/**
 * 유튜브 해당 채널의 전체 재생목록 ID를 가져옵니다
 *
 * Step1. useYoutubeChannelPlayList
 * Stem2. useYoutubePlayListVideoInfo
 *
 * 해당 채널의 전체 재생목록을 가져온 후 재생목록ID를 통해 모든 동영상 정보를 가져올 수 있습니다
 *
 */
export const useYoutubeChannelPlayList = (channel: string) => {
  const fetchYoutubeChannelPlayList = async (channel: string) => {
    const response = await axios.get(`/api/youtube/channels?part=contentDetails&id=${channel}&key=${YOUTUBE_KEY}`)
    return response.data
  }
  return useQuery({
    queryKey: ['fetchYoutubeChannelPlayList', channel], // 캐시 키
    queryFn: () => fetchYoutubeChannelPlayList(channel),
    enabled: !!channel,
    staleTime: 1000 * 60 * 5,
  })
}

/**
 * 유튜브 특정 지역(한국)의 인기 동영상 가져오기
 */
export const useYoutubePopularVideo = () => {
  const fetchYoutubePopularVideo = async ({ pageParam = '' }) => {
    const response = await axios.get(
      `/api/youtube/videos?part=snippet,statistics&chart=mostPopular&regionCode=KR&maxResults=10&pageToken=${pageParam}&key=${YOUTUBE_KEY}`,
    )
    return response.data
  }

  return useInfiniteQuery({
    queryKey: ['fetchYoutubePopularVideo'],
    queryFn: fetchYoutubePopularVideo,
    getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
    initialPageParam: '',
    staleTime: 1000 * 60 * 5,
  })
}
