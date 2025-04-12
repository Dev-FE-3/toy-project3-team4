import { useQuery } from '@tanstack/react-query'
import { fetchYoutubePlayListInfo } from '@/shared/util/youtube'

const usePlayListInfo = (playListId: string) => {
  return useQuery({
    queryKey: ['youtubePlaylistInfo', playListId],
    queryFn: () => fetchYoutubePlayListInfo(playListId),
    enabled: !!playListId,
    staleTime: 1000 * 60 * 5,
  })
}

export default usePlayListInfo
