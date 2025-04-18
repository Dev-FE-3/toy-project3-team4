import { fetchYoutubeChannel } from '@/shared/util/youtube'
import { useQuery } from '@tanstack/react-query'

const useChannelInfo = (channelId: string) => {
  return useQuery({
    queryKey: ['fetchYoutubeChannel', channelId], // 캐시 키
    queryFn: () => fetchYoutubeChannel(channelId),
    enabled: !!channelId,
    staleTime: 1000 * 60 * 5,
  })
}

export default useChannelInfo
