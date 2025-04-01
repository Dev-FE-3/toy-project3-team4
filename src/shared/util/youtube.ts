import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const YOUTUBE_KEY = import.meta.env.VITE_YOUTUBE_KEY

/*
 ** 유튜브 비디오 ID를 통해 정보를 가져옵니다.
 */
const fetchYoutubeVideoInfo = async (videoId: string) => {
  const response = await axios.get(`/api/youtube/videos?part=snippet,statistics&id=${videoId}&key=${YOUTUBE_KEY}`)
  return response.data
}

export const useYoutubeVideo = (videoId: string) => {
  return useQuery({
    queryKey: ['youtubeVideo', videoId], // 캐시 키
    queryFn: () => fetchYoutubeVideoInfo(videoId),
    enabled: !!videoId,
    staleTime: 1000 * 60 * 5,
  })
}
