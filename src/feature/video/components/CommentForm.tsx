import { useUserList } from '@/feature/home/api/useUserList'
import { Input } from '@/shared/lib/shadcn/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { useState } from 'react'

import { ICommentFormProps } from '../type/IVideo'
import { postComment } from '../service/comment'

const CommentForm: React.FC<ICommentFormProps> = ({ onSuccess, videoId }) => {
  const [comment, setComment] = useState('')
  // 임시 유저 id
  const userId = 12
  // 임시 유저  data
  const { data: users, isLoading: isUsersLoading, error: userError } = useUserList()

  if (isUsersLoading) return <p>Loading...</p>
  if (userError) return <p>Error...</p>

  // 임시 유저  img
  const userImg = users[1].img

  // 댓글 슈퍼베이스에 저장하기
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (comment === '') {
      return
    }

    try {
      const newCommnet = await postComment({
        video_id: videoId,
        content: comment,
        user_id: userId,
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
        <AvatarImage className="rounded-full border border-gray-medium object-cover" src={userImg} />
        <AvatarFallback>User</AvatarFallback>
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
