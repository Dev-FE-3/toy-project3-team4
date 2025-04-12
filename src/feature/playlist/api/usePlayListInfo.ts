import { useQuery } from '@tanstack/react-query'
import { fetchYoutubePlayListInfo } from '@/shared/util/youtube'

const usePlayListInfo = (playListId: string, myself: boolean) => {
  return useQuery({
    queryKey: ['playlistInfo', myself ? 'me' : 'yt', playListId],
    queryFn: async () => {
      const data = await fetchYoutubePlayListInfo(playListId)

      // 여기서 필요한 값만 추려서 리턴
      return {
        title: data.items[0].snippet.title,
        channelTitle: data.items[0].snippet.channelTitle,
        id: data.items[0].id,
      }
    },
    enabled: !!playListId,
    staleTime: 1000 * 60 * 5,
  })
}

export default usePlayListInfo
