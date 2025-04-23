import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { CircleUserRound, MoreVertical } from 'lucide-react'
import { ICommentProps } from '../type/IVideo'
import { useUserImgInfo } from '../api/useUserImg'

const Comment: React.FC<ICommentProps> = ({ comment, userId, createdAt }) => {
  const { data: userInfo, isLoading: userInfoLoading, error: userInfoError } = useUserImgInfo(userId || 0)

  if (userInfoLoading || userInfoError || !userInfo) return <></>

  return (
    <article className="mb-[15px] flex-col gap-[30px]">
      <div className="flex w-full justify-between text-sm">
        <div className="flex">
          <Avatar className="h-[25px] w-[25px]">
            <AvatarImage className="rounded-full border border-gray-medium object-cover" src={userInfo[0]} />
            <AvatarFallback>
              <CircleUserRound />
            </AvatarFallback>
          </Avatar>
          <div className="pl-[10px] text-gray-dark">
            @{userInfo[1]} • {createdAt}
          </div>
        </div>
        <MoreVertical size={15} strokeWidth={2} className="fill-gray-medium-dark" />
      </div>

      <p className="mr-[15px] pl-[35px]">{comment}</p>
    </article>
  )
}

export default Comment
