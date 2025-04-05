import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { EllipsisVertical } from 'lucide-react'

const Comment: React.FC = () => {
  return (
    <div className="mb-[15px] flex-col gap-[30px] text-sm">
      <div className="flex w-full justify-between">
        <div className="flex">
          <Avatar className="h-[25px] w-[25px]">
            <AvatarImage className="rounded-full border border-gray-medium object-cover" src="https://github.com/shadcn.png" />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
          <div className="pl-[5px]">@15ya_egg • 1시간전</div>
        </div>
        <EllipsisVertical />
      </div>

      <div className="pl-[30px]">
        <div>와 플레이리스트 나온지 얼마나 됐다고 이런걸 또... 네코드 고마워요! 언제나 최고!</div>
      </div>
    </div>
  )
}

export default Comment
