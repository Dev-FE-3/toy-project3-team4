import { useQuery } from '@tanstack/react-query'
import { fetchYoutubeVideoInfo } from '@/shared/util/youtube'

const useYoutubeVideoInfo = (videoId: string) => {
  return useQuery({
    queryKey: ['youtubeVideoInfo', videoId],
    queryFn: () => fetchYoutubeVideoInfo(videoId),
    enabled: !!videoId,
    staleTime: 1000 * 60 * 5,
  })
}

export default useYoutubeVideoInfo
