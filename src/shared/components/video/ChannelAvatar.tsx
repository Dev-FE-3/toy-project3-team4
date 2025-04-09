import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Link } from 'react-router-dom'
import ChannelAvatarProps from './type/IChannelAvatarProps'

const ChannelAvatar = ({ channelId, channelThumbnail }: ChannelAvatarProps) => {
  return (
    <Link to={`/channel/${channelId}`}>
      <Avatar className="h-9 w-9 block">
        <AvatarImage
          className="rounded-full border border-gray-medium object-cover"
          src={channelThumbnail || '/image/download/background.svg'}
          alt="채널 프로필 이미지"
        />
      </Avatar>
    </Link>
  )
}

export default ChannelAvatar
