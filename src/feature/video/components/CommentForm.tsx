import { Input } from '@/shared/lib/shadcn/ui/input'
import { Avatar } from '@/shared/lib/shadcn/ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { useState } from 'react'

import { ICommentFormProps } from '../type/IVideo'

import { useAuthStore } from '@/shared/store/auth/useAuthStore'
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
    <form className="flex items-center justify-between gap-[10px] border-b border-gray-light-medium pb-[15px]" onSubmit={handleSubmit}>
      <Avatar className="h-6 w-6">
        <AvatarImage
          className="rounded-full border border-gray-medium object-cover"
          src={user ? user.img : '/image/download/background.svg'}
          alt="프로필사진"
        />
      </Avatar>
      <label htmlFor="comment" className="sr-only">
        댓글 입력
      </label>
      <Input
        id="comment"
        name="comment"
        className="bg-basic-white text-[15px] placeholder:text-gray-medium"
        type="text"
        placeholder="댓글 입력"
        value={comment}
        autoComplete="off"
        onChange={(e) => setComment(e.target.value)}
      />
    </form>
  )
}

export default CommentForm
