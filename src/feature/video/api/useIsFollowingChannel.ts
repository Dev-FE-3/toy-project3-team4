import { useQuery } from '@tanstack/react-query'
import { isFollowingChannel } from '../service/channel'

export const useIsFollowingChannel = (userId: number, channel: string) => {
  return useQuery({
    queryKey: ['follow', userId, channel],
    queryFn: () => isFollowingChannel(userId, channel),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  })
}
