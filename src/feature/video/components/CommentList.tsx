import Comment from './Comment'
import './../util/video.css'
import { useUserList } from '@/feature/home/api/useUserList'
import { formatTimeAgo } from '../service/formatters'
import { ICommentListProps } from '../type/IVideo'

const CommentList: React.FC<ICommentListProps> = ({ comments, newlyAddedComment }) => {
  // 새로운 댓글을 입력시 보여주기 위함
  const fullList = newlyAddedComment ? [newlyAddedComment, ...comments] : comments

  // 임시 유저 id
  const userId = 12
  // 임시 유저  data
  const { data: users, isLoading: isUsersLoading, error: userError } = useUserList()

  if (isUsersLoading) return <p>Loading...</p>
  if (userError) return <p>Error...</p>

  // 임시 유저  img
  const userImg = users[1].img

  return (
    <ul className="custom-scrollbar mt-[15px] max-h-[350px] overflow-y-auto px-[15px]">
      {fullList?.length !== 0 ? (
        fullList?.map((comment) => (
          <li key={comment.user_id}>
            <Comment comment={comment.content} userId={comment.user_id} userImg={userImg} createdAt={formatTimeAgo(comment.created_at)} />
          </li>
        ))
      ) : (
        <li className="my-[15px] text-center">아직 댓글이 없습니다.</li>
      )}
    </ul>
  )
}

export default CommentList
