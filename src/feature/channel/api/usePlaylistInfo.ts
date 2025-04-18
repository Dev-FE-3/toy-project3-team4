import axiosInstance from '@/shared/lib/axios/axiosInstance'
import { useQuery } from '@tanstack/react-query'

export interface IPlayList {
  id: number
  created_at: string
  user_id: number
  name: string
  access: string
}

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
