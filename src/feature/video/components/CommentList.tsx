import Comment from './Comment'
import './../util/video.css'
import { ICommentListProps } from '../type/IVideo'
import { formatUploadDate } from '@/shared/util/format'

const CommentList: React.FC<ICommentListProps> = ({ comments, newlyAddedComment }) => {
  // 새로운 댓글을 입력시 보여주기 위함
  const fullList = newlyAddedComment ? [newlyAddedComment, ...comments] : comments

  return (
    <ul className="custom-scrollbar mt-[15px] max-h-[calc(100vh_-_56px_-_56px_-_240px_-_175px_-_61px_-_25px)] overflow-y-auto px-[15px]">
      {fullList?.length !== 0 ? (
        fullList?.map((comment, index) => (
          <li key={index}>
            <Comment comment={comment.content} userId={comment.user_id} createdAt={formatUploadDate(comment.created_at)} />
          </li>
        ))
      ) : (
        <li className="my-[15px] text-center">아직 댓글이 없습니다.</li>
      )}
    </ul>
  )
}

export default CommentList
