import Comment from './Comment'
import './../util/video.css'
import { ICommentListProps } from '../type/IVideo'
import { formatUploadDate } from '@/shared/util/format'

const CommentList: React.FC<ICommentListProps> = ({ comments, newlyAddedComment }) => {
  // 새로운 댓글을 입력시 보여주기 위함
  const fullList = newlyAddedComment ? [newlyAddedComment, ...comments] : comments

  return (
    <ul className="custom-scrollbar mt-[15px] max-h-[calc(100vh-56px-56px-240px-184px-72px-30px)] flex-1 overflow-y-auto">
      {fullList?.length !== 0 ? (
        fullList?.map((comment, index) => (
          <li key={index}>
            <Comment comment={comment.content} userId={comment.user_id} createdAt={formatUploadDate(comment.created_at || '방금전')} />
          </li>
        ))
      ) : (
        <li className="my-[15px] text-center text-[14px] text-gray-medium-dark">여러분의 생각을 공유해주세요.</li>
      )}
    </ul>
  )
}

export default CommentList
