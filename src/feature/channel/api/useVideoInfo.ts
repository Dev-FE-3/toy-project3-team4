import axiosInstance from '@/shared/lib/axios/axiosInstance'
import { fetchYoutubeVideoInfo } from '@/shared/util/youtube'
import { useQuery } from '@tanstack/react-query'

const fetchSupabaseVideo = async (playlistId: number) => {
  const supabaseResult = await axiosInstance.get(`videolist?playlist_id=eq.${playlistId}&order=order.asc`)
  if (supabaseResult.data.length === 0) {
    return ['/public/image/default/thumbnail.png', { playlist_id: null, video_id: null }, 0]
  }
  const youTubeVideoInfo = await fetchYoutubeVideoInfo(supabaseResult.data[0].video_id)
  return [youTubeVideoInfo.items[0].snippet.thumbnails.medium.url, supabaseResult.data[0], supabaseResult.data.length]
}

export const useVideoInfo = (playlistId: number) => {
  return useQuery({
    queryKey: ['videoinfo', playlistId],
    queryFn: () => fetchSupabaseVideo(playlistId),
  })
}
