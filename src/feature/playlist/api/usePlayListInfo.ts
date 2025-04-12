import { useQuery } from '@tanstack/react-query'
import { fetchYoutubePlayListInfo } from '@/shared/util/youtube'

const usePlayListInfo = (playlistId: string) => {
  return useQuery({
    queryKey: ['youtubePlaylistInfo', playlistId],
    queryFn: () => fetchYoutubePlayListInfo(playlistId),
    enabled: !!playlistId,
    staleTime: 1000 * 60 * 5,
  })
}

export default usePlayListInfo
