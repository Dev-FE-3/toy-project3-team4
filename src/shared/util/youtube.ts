import { useQuery } from '@tanstack/react-query'
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
