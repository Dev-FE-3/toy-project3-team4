import axiosInstance from '@/shared/lib/axios/axiosInstance'
import { useQuery } from '@tanstack/react-query'
import { IPlayList } from '../tpye/IChannel'

export const fetchPlayList = async (userId: number): Promise<IPlayList[]> => {
  const response = await axiosInstance.get(`playlist?user_id=eq.${userId}&order=created_at.desc`)

  return response.data
}

export const usePlayList = (userId: number) => {
  return useQuery({
    queryKey: ['playlist', userId],
    queryFn: () => fetchPlayList(userId),
    enabled: !!userId,
  })
}
