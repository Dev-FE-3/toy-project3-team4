import Comment from './Commnet'
import './../util/index.css'

const CommentList: React.FC = () => {
  // 여기서 댓글 내용들을 호출해서 map 돌리면 되지 않을깜?
  return (
    <div className="custom-scrollbar mt-[15px] max-h-[350px] overflow-y-auto px-[15px]">
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </div>
  )
}

export default CommentList
