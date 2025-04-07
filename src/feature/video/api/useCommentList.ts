import axiosInstance from '@/shared/lib/axios/axiosInstance'
import { ICommentList } from '../type/IVideo'
import { useQuery } from '@tanstack/react-query'

const fetchComments = async (videoId: string): Promise<ICommentList[]> => {
  const response = await axiosInstance.get(`/comment?video_id=eq.${videoId}&order=created_at.desc`)
  return response.data
}

export const useCommentList = (videoId: string) => {
  return useQuery({
    queryKey: ['comment', videoId],
    queryFn: () => fetchComments(videoId),
    enabled: !!videoId,
  })
}
