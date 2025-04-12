import { useQuery } from '@tanstack/react-query'
import { fetchYoutubePlayListInfo } from '@/shared/util/youtube'

const usePlayListInfo = (playlistId: string, myself: boolean) => {
  return useQuery({
    queryKey: ['playlistInfo', myself ? 'me' : 'yt', playlistId],
    queryFn: async () => {
      const data = await fetchYoutubePlayListInfo(playlistId)

      // 여기서 필요한 값만 추려서 리턴
      return {
        title: data.items[0].snippet.title,
        channelTitle: data.items[0].snippet.channelTitle,
        id: data.items[0].id,
      }
    },
    enabled: !!playlistId,
    staleTime: 1000 * 60 * 5,
  })
}

export default usePlayListInfo
