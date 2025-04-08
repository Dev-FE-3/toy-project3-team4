import axios from 'axios'

const YOUTUBE_KEY = import.meta.env.VITE_YOUTUBE_KEY

/** 유튜브 비디오 ID로 정보 가져오기 */
export const fetchYoutubeVideoInfo = async (videoId: string) => {
  const response = await axios.get(`/api/youtube/videos?part=snippet,statistics&id=${videoId}&key=${YOUTUBE_KEY}`)
  return response.data
}

/** 유튜브 재생목록 제목과 정보 */
export const fetchYoutubePlayListInfo = async (playListId: string) => {
  const response = await axios.get(`/api/youtube/playlists?part=snippet,contentDetails&id=${playListId}&key=${YOUTUBE_KEY}`)
  return response.data
}

/** 유튜브 재생목록 내 비디오들 정보 */
export const fetchYoutubePlayListVideoInfo = async (playListId: string) => {
  const response = await axios.get(`/api/youtube/playlistItems?part=snippet&playlistId=${playListId}&maxResults=5&key=${YOUTUBE_KEY}`)
  return response.data
}

/** 유튜브 검색 결과 */
export const fetchYoutubeSearchResult = async (search: string) => {
  const response = await axios.get(`/api/youtube/search?part=snippet&q=${search}&key=${YOUTUBE_KEY}`)
  return response.data
}

/** 유튜브 채널 정보 */
export const fetchYoutubeChannel = async (channelId: string) => {
  const response = await axios.get(`/api/youtube/channels?part=snippet,statistics,brandingSettings&id=${channelId}&key=${YOUTUBE_KEY}`)
  return response.data
}

/**
 * 유튜브 해당 채널의 전체 재생목록 ID를 가져옵니다
 *
 * Step1. fetchYoutubeChannelPlayList
 * Stem2. fetchYoutubePlayListVideoInfo
 *
 * 해당 채널의 전체 재생목록을 가져온 후 재생목록ID를 통해 모든 동영상 정보를 가져올 수 있습니다
 *
 */
export const fetchYoutubeChannelPlayList = async (channelId: string) => {
  const response = await axios.get(`/api/youtube/channels?part=contentDetails&id=${channelId}&key=${YOUTUBE_KEY}`)
  return response.data
}

/** 유튜브 인기 동영상 (한국) */
export const fetchYoutubePopularVideo = async ({ pageParam }: { pageParam: string }) => {
  const response = await axios.get(
    `/api/youtube/videos?part=snippet,statistics&chart=mostPopular&regionCode=KR&maxResults=5&pageToken=${pageParam}&key=${YOUTUBE_KEY}`,
  )
  return response.data
}

/** 유튜브 인기 재생목록 (한국) */
export const fetchYoutubePopularPlaylist = async ({ pageParam }: { pageParam: string }) => {
  const response = await axios.get(
    `/api/youtube/search?part=snippet&type=playlist&q=인기|예능|개발자|&relevanceLanguage=ko&regionCode=KR&safeSearch=strict&maxResults=10&pageToken=${pageParam}&key=${YOUTUBE_KEY}`,
  )
  return response.data
}
