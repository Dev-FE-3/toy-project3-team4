import { Button } from '@/shared/lib/shadcn/ui/button'
import { ILikeButtonProps } from '../type/IVideo'
import { Heart } from 'lucide-react'
import { formatLikeCount } from '@/shared/util/format'
import { useLikeData } from '../api/useLikeData'

const LikeButton = ({ videoId, userId }: ILikeButtonProps) => {
  const { likeCount, isLiked, toggleLike, isPending } = useLikeData(videoId, userId)

  return (
    <>
      <Button onClick={() => toggleLike()} disabled={isPending} className="rounded-full bg-gray-light px-[9px] py-[7px] text-xs text-gray-dark">
        {isLiked ? <Heart fill="#525252" /> : <Heart />} {formatLikeCount(likeCount ?? 0)}
      </Button>
    </>
  )
}
export default LikeButton
