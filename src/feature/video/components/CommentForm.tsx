import { Input } from '@/shared/lib/shadcn/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { useState } from 'react'

import { ICommentFormProps } from '../type/IVideo'

import { useAuthStore } from '@/shared/store/auth/useAuthStore'
import { CircleUserRound } from 'lucide-react'
import { postComment } from '../api/useCommentList'

const CommentForm: React.FC<ICommentFormProps> = ({ onSuccess, videoId }) => {
  const [comment, setComment] = useState('')

  const user = useAuthStore((state) => state.user)

  // 댓글 슈퍼베이스에 저장하기
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (comment === '' || user?.id === undefined) {
      //user id가 없을때 즉 로그인 안돼 있을 떄 일단 못 달게 해놓음
      return
    }

    try {
      const newCommnet = await postComment({
        video_id: videoId,
        content: comment,
        user_id: user.id,
      })
      onSuccess(newCommnet)
      setComment('')
    } catch (error) {
      console.error('댓글 저장 실패:', error)
    }
  }

  return (
    <form className="flex items-center justify-between gap-[5px] pb-[15px]" onSubmit={handleSubmit}>
      <Avatar className="h-[25px] w-[25px]">
        <AvatarImage className="rounded-full border border-gray-medium object-cover" src={user?.img} />
        <AvatarFallback>
          <CircleUserRound />
        </AvatarFallback>
      </Avatar>

      <label htmlFor="comment" className="sr-only">
        댓글 입력
      </label>
      <Input
        id="comment"
        name="comment"
        className="py[16px] bg-basic-white px-[12px] placeholder:text-gray-medium"
        type="text"
        placeholder="댓글 입력"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
    </form>
  )
}

export default CommentForm
