import { useState } from 'react'
import CommentForm from './CommentForm'
import CommentList from './CommentList'
import { ICommentContainerProps, ICommentPayload } from '../type/IVideo'
import { useCommentList } from '../api/useCommentList'

const CommentContainer: React.FC<ICommentContainerProps> = ({ id }) => {
  const [newComment, setNewComment] = useState<ICommentPayload | null>(null)

  const { data: comments, isLoading: isCommentsLoading, error: commentsError, refetch } = useCommentList(id)

  if (isCommentsLoading) return <div>Loading...</div>
  if (commentsError) return <div>Error</div>

  const handleNewComment = async (comment: ICommentPayload) => {
    setNewComment(comment) // 임시로 추가된 댓글 넣어주기
    await refetch() // 서버에서도 최신 댓글 다시 가져오기
    setNewComment(null) // 임시 댓글 초기화
  }

  return (
    <section className="mx-[15px] rounded-xl bg-gray-light px-[15px] pt-[10px]">
      <CommentForm onSuccess={handleNewComment} videoId={id} />
      <div className="h-[1px] w-full bg-gray-medium"></div>
      <CommentList comments={comments} newlyAddedComment={newComment} />
    </section>
  )
}

export default CommentContainer
