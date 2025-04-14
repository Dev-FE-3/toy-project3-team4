import { fetchYoutubePlayListVideoInfo } from '@/shared/util/youtube'
import { useQuery } from '@tanstack/react-query'

const usePlaylistVideos = (playlistId: string) => {
  return useQuery({
    queryKey: ['fetchYoutubePlayListVideoInfo', playlistId],
    queryFn: () => fetchYoutubePlayListVideoInfo(playlistId),
    staleTime: 1000 * 60 * 5,
  })
}

export default usePlaylistVideos
