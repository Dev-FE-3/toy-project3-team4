import axiosInstance from '@/shared/lib/axios/axiosInstance'
import { useQuery } from '@tanstack/react-query'

// ✅ 로그인 한 유저가 해당 채널을 팔로우 했는지 확인
const isFollowingChannel = async (userId: number, channel: string): Promise<boolean> => {
  const response = await axiosInstance.get(`/follow?user_id=eq.${userId}&channel=eq.${channel}`)
  return response.data.length > 0
}

export const useIsFollowingChannel = (userId: number, channel: string) => {
  return useQuery({
    queryKey: ['follow', userId, channel],
    queryFn: () => isFollowingChannel(userId, channel),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  })
}
