import { Input } from '@/shared/lib/shadcn/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { useState } from 'react'

const CommentForm: React.FC = () => {
  const [comment, setComment] = useState<string>('')

  // 댓글 슈퍼베이스에 저장하기
  const handleSubmit = () => {
    return 0
  }

  return (
    <div className="flex items-center justify-between gap-[5px] pb-[15px]">
      <Avatar className="h-[25px] w-[25px]">
        <AvatarImage className="rounded-full border border-gray-medium object-cover" src="https://github.com/shadcn.png" />
        <AvatarFallback>User</AvatarFallback>
      </Avatar>

      <form className="w-full" onSubmit={handleSubmit}>
        <Input
          className="py[16px] bg-basic-white px-[12px] placeholder:text-gray-medium"
          type="text"
          placeholder="댓글 입력"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </form>
    </div>
  )
}

export default CommentForm
