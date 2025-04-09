import { useQuery } from '@tanstack/react-query'
import { fetchYoutubePlayListVideoInfo } from '@/shared/util/youtube'

const useYoutubePlayListVideoInfo = (playlistId: string) => {
  return useQuery({
    queryKey: ['youtubePlaylistVideos', playlistId],
    queryFn: () => fetchYoutubePlayListVideoInfo(playlistId),
    enabled: !!playlistId,
    staleTime: 1000 * 60 * 5,
  })
}

export default useYoutubePlayListVideoInfo
