import { Avatar, AvatarImage } from '../../lib/shadcn/ui/avatar'
import { Button } from '../../lib/shadcn/ui/button'
import { UserRoundPlus } from 'lucide-react'
import IUserChannelProps from './type/IUserChannelProps'

const UserChannel = ({ isMe, channelName, username, followers, profileUrl, isFollowing = false }: IUserChannelProps) => {
  return (
    <article>
      <div className="mb-[20px] mt-[20px] flex">
        <Avatar className="h-[88px] w-[88px]">
          <AvatarImage className="h-full w-full rounded-full border border-gray-medium object-cover" src={profileUrl} alt="프로필사진" />
        </Avatar>
        <div className="ml-[15px] flex w-full flex-col justify-center gap-1">
          <p className="text-xl font-semibold">{channelName}</p>
          <div className="flex text-sm text-gray-medium-dark">
            <span>{username}</span>
            <span className="relative flex items-center before:mx-2 before:block before:h-[12px] before:w-[1px] before:bg-gray-medium before:content-['']">
              팔로워 {followers}
            </span>
          </div>
          {!isMe && (
            <Button className="h-[30px] bg-main-primary text-basic-white hover:bg-blue-600">
              <UserRoundPlus />
              {isFollowing ? '팔로잉' : '팔로우'}
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}

export default UserChannel
