import axiosInstance from '@/shared/lib/axios/axiosInstance'
import { useQuery } from '@tanstack/react-query'

export const useFindPlayList = (userId: number) => {
  const fetchPlayList = async () => {
    const response = await axiosInstance.get(`/playlist?user_id=eq.${userId}&select=id,name,access,videolist(id,video_id,"order")`)
    const data = response.data

    return data.map((playlist: { videolist: [] }) => ({
      ...playlist,
      videolist: [...playlist.videolist].reverse(), // 배열 자체 순서만 반전
    }))
  }

  return useQuery({
    queryKey: ['find-playList', userId],
    queryFn: fetchPlayList,
    enabled: !!userId,
  })
}
