import { useQuery } from '@tanstack/react-query'
import { fetchComments } from '../service/comment'

export const useCommentList = (videoId: string) => {
  return useQuery({
    queryKey: ['comment', videoId],
    queryFn: () => fetchComments(videoId),
    enabled: !!videoId,
    staleTime: 1000 * 60 * 5,
  })
}
