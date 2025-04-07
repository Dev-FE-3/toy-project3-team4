import axiosInstance from '@/shared/lib/axios/axiosInstance'
import { ICommentPayload } from '../type/IVideo'

export const postComment = async (commentData: ICommentPayload) => {
  const response = await axiosInstance.post('/comment', [commentData])
  return response.data
}
