import { fetchYoutubeVideoInfo } from '@/shared/util/youtube'
import { useQuery } from '@tanstack/react-query'

export const useYoutubeVideoInfo = (videoId: string) => {
  return useQuery({
    queryKey: ['youtubeVideo', videoId],
    queryFn: () => fetchYoutubeVideoInfo(videoId),
    enabled: !!videoId,
    staleTime: 1000 * 60 * 5,
  })
}
