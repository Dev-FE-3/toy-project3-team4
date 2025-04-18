import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/shared/lib/axios/axiosInstance'
import { FollowingChannel } from '../type/IFollowingTypes'

export const useFollowingChannels = (userId: number) => {
  const getFollowingChannels = async (userId: number): Promise<FollowingChannel[]> => {
    const response = await axiosInstance.get('/follow', {
      params: {
        user_id: `eq.${userId}`,
      },
    })
    return response.data
  }

  return useQuery({
    queryKey: ['followingChannels', userId],
    queryFn: () => getFollowingChannels(userId),
    enabled: !!userId,
  })
}
