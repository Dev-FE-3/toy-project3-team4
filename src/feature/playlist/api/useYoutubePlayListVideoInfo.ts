import { useQuery } from '@tanstack/react-query'
import { fetchYoutubePlayListVideoInfo } from '@/shared/util/youtube'

/** Tanstack Query 훅으로 만든 유튜브 재생목록 정보 */
const useYoutubePlayListVideoInfo = (playlistId: string) => {
  return useQuery({
    queryKey: ['youtubePlaylistVideos', playlistId],
    queryFn: () => fetchYoutubePlayListVideoInfo(playlistId),
    enabled: !!playlistId, // playlistId가 있어야 요청 시작
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  })
}

export default useYoutubePlayListVideoInfo
