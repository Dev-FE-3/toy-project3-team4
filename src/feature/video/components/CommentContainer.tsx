import CommentForm from './CommentForm'
import CommentList from './CommentList'

const CommentContainer: React.FC = () => {
  return (
    <div className="mx-[15px] rounded-xl bg-gray-light px-[15px] pt-[10px]">
      <CommentForm />
      <div className="h-[1px] w-full bg-gray-medium"></div>
      <CommentList />
    </div>
  )
}

export default CommentContainer
