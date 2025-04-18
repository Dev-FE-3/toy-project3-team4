import { fetchYoutubeVideoInfo } from '@/shared/util/youtube'
import { useQuery } from '@tanstack/react-query'

const useVideoInfo = (videoId: string) => {
  return useQuery({
    queryKey: ['videoInfo', videoId],
    queryFn: () => fetchYoutubeVideoInfo(videoId),
    enabled: !!videoId,
    staleTime: 1000 * 60 * 5,
  })
}

export default useVideoInfo
