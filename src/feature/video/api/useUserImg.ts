import { useQuery } from '@tanstack/react-query'
import { getUserImg } from '../service/user'

export const useUserImg = (userId: number) => {
  return useQuery({
    queryKey: ['userImg', userId],
    queryFn: () => getUserImg(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  })
}
