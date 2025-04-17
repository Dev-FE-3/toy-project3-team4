import { useState } from 'react'
import { deleteFollowChannel, postFollowChannel, useIsFollowingChannel } from '../api/useIsFollowingChannel'
import { Button } from '@/shared/lib/shadcn/ui/button'
import { UserRoundPlus, UserRoundX } from 'lucide-react'
import { IFollowButtonProps } from '../type/IVideo'

const FollowButton = ({ userId, channelId }: IFollowButtonProps) => {
  const { data: isFollowing, refetch } = useIsFollowingChannel(userId, channelId)
  const [isPending, setIsPending] = useState(false)

  const handleToggleFollow = async () => {
    if (!userId) {
      return
    }
    setIsPending(true)
    try {
      if (isFollowing) {
        await deleteFollowChannel(userId, channelId)
      } else {
        await postFollowChannel({ user_id: userId, channel: channelId })
      }

      await refetch()
    } catch (err) {
      console.error('팔로우 상태 변경 실패:', err)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <>
      <Button
        onClick={handleToggleFollow}
        disabled={isPending}
        className={`rounded-full py-4 text-sm font-medium ${
          isFollowing ? 'w-[102px] bg-gray-light text-gray-dark hover:bg-gray-light-medium' : 'w-[77px] bg-main-primary text-white hover:bg-blue-600'
        }`}
      >
        {isPending ? (
          isFollowing ? (
            <>
              <UserRoundX className="h-4 w-4" /> 팔로우 취소
            </>
          ) : (
            <>
              <UserRoundPlus className="h-4 w-4" /> 팔로우
            </>
          )
        ) : isFollowing ? (
          <>
            <UserRoundX className="h-4 w-4" />
            팔로우 취소
          </>
        ) : (
          <>
            <UserRoundPlus className="h-4 w-4" /> 팔로우
          </>
        )}
      </Button>
    </>
  )
}

export default FollowButton
