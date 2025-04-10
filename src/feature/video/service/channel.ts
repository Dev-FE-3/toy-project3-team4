import axiosInstance from '@/shared/lib/axios/axiosInstance'

// ✅ 로그인 한 유저가 해당 채널을 팔로우 했는지 확인
export const isFollowingChannel = async (userId: number, channel: string): Promise<boolean> => {
  const response = await axiosInstance.get(`/follow?user_id=eq.${userId}&channel=eq.${channel}`)
  return response.data.length > 0
}
