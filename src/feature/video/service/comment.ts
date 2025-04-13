import axiosInstance from '@/shared/lib/axios/axiosInstance'
import { ICommentList, ICommentPayload } from '../type/IVideo'

// ✅ 해당 영상의 댓글들을 시간 순으로 받아옴
export const fetchComments = async (videoId: string): Promise<ICommentList[]> => {
  const response = await axiosInstance.get(`/comment?video_id=eq.${videoId}&order=created_at.desc`)
  return response.data
}

// ✅ 해당 영상의 댓글을 저장
export const postComment = async (commentData: ICommentPayload) => {
  const response = await axiosInstance.post('/comment', [commentData])
  return response.data
}
