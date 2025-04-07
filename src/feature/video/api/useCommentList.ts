import axiosInstance from '@/shared/lib/axios/axiosInstance'
import { ICommentList } from '../type/IVideo'
import { useQuery } from '@tanstack/react-query'

// ✅ 해당 영상의 댓글들을 시간 순으로 받아옴
const fetchComments = async (videoId: string): Promise<ICommentList[]> => {
  const response = await axiosInstance.get(`/comment?video_id=eq.${videoId}&order=created_at.desc`)
  return response.data
}

export const useCommentList = (videoId: string) => {
  return useQuery({
    queryKey: ['comment', videoId],
    queryFn: () => fetchComments(videoId),
    enabled: !!videoId,
    staleTime: 1000 * 60 * 5,
  })
}
