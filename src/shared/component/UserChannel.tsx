import { Avatar, AvatarImage } from '../lib/shadcn/ui/avatar'
import { Button } from '../lib/shadcn/ui/button'
import { UserRoundPlus } from 'lucide-react'

const UserChannel = ({ myself = false }) => {
  if (!myself) alert('타 채널')

  return (
    <article>
      <div className="mb-[20px] mt-[20px] flex">
        <Avatar className="size-22">
          <AvatarImage className="rounded-full border border-gray-medium object-cover" src="/public/image/profile/myself.png" alt="프로필사진" />
        </Avatar>
        <div className="ml-[15px] flex w-full flex-col justify-center gap-1">
          <p className="text-xl font-semibold">박현수</p>
          <div className="flex text-sm text-gray-medium-dark">
            <span>@bangacoding</span>
            <span className="relative flex items-center before:mx-2 before:block before:h-[12px] before:w-[1px] before:bg-gray-medium before:content-['']">
              팔로워 1.1만명
            </span>
          </div>
          {!myself && (
            <Button className="h-[30px] bg-main-primary text-basic-white hover:bg-blue-600">
              <UserRoundPlus />
              팔로우
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}

export default UserChannel
