// ✅ 비디오 상세 조회 시 사용하는 Props
export interface IDetailedVideoProps {
  id: string
}

// ✅ 댓글 작성 후 CommentContainer(부모) 컴포넌트에 전달할 때 사용하는 Props
export interface ICommentFormProps {
  onSuccess: (newComment: ICommentPayload) => void
}

// ✅ 댓글 리스트 렌더링 시 사용하는 Props
export interface ICommentListProps {
  comments?: ICommentList[]
  newlyAddedComment?: ICommentPayload | null
}

// ✅ 댓글 렌더링 할 때
export interface ICommentProps {
  userId: number
  userImg: string
  comment: string
  createdAt: string
}

// ✅ Supabase에 댓글 저장 할 때 payload 타입 (POST)
export interface ICommentPayload {
  video_id: string
  content: string
  user_id: number
}

// ✅ Supabase에 저장된 댓글 들을 받아올 때 (GET)
export interface ICommentList {
  id: number
  video_id: string
  content: string
  user_id: number
  created_at: string
}

// ✅ 팔로우 버튼 Props
export interface IFollowButtonProps {
  userId: number
  channelId: string
}
