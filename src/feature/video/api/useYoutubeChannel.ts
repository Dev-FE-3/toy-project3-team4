import { fetchYoutubeChannel } from '@/shared/util/youtube'
import { useQuery } from '@tanstack/react-query'

export const useYoutubeChannel = (channel: string) => {
  return useQuery({
    queryKey: ['fetchYoutubeChannel', channel], // 캐시 키
    queryFn: () => fetchYoutubeChannel(channel),
    enabled: !!channel,
    staleTime: 1000 * 60 * 5,
  })
}
