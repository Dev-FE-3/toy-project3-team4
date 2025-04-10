import axiosInstance from '@/shared/lib/axios/axiosInstance'

interface IFollowPaylodad {
  user_id: number
  channel: string
}

export const postFollowChannel = async (followData: IFollowPaylodad) => {
  const response = await axiosInstance.post('/follow', [followData])
  return response.data
}

export const deleteFollowChannel = async (userId: number, channel: string) => {
  const response = await axiosInstance.delete(`/follow?user_id=eq.${userId}&channel=eq.${channel}`)
  return response.data
}
