import { fetchYoutubePlayListInfo } from '@/shared/util/youtube'
import { useQuery } from '@tanstack/react-query'

const usePlaylistInfo = (playlistId: string) => {
  return useQuery({
    queryKey: ['fetchYoutubePlayListInfo', playlistId],
    queryFn: () => fetchYoutubePlayListInfo(playlistId),
    enabled: !!playlistId,
    staleTime: 1000 * 60 * 5,
  })
}

export default usePlaylistInfo
