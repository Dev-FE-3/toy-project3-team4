import useChannelInfo from '@/feature/home/api/useChannelInfo'
import ChannelData from '../type/IChannelData'
import { FollowingThumbnailProps } from '../type/IFollowingTypes'

const FollowingThumbnail = ({ channelId }: FollowingThumbnailProps) => {
  const { data: channelData } = useChannelInfo(channelId) as { data: ChannelData }
  const channel = channelData?.items[0]

  return (
    <li className="h-[46px] w-[46px] overflow-hidden rounded-full border border-gray-light-medium">
      <img src={channel?.snippet.thumbnails.default.url} alt={channel?.snippet.title} title={channel?.snippet.title} />
    </li>
  )
}

export default FollowingThumbnail
