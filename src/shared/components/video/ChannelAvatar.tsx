import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import ChannelAvatarProps from './type/IChannelAvatarProps'

const ChannelAvatar = ({ channelThumbnail }: ChannelAvatarProps) => {
  return (
    <Avatar className="block h-9 w-9">
      <AvatarImage
        className="rounded-full border border-gray-medium object-cover"
        src={channelThumbnail || '/image/download/background.svg'}
        alt="채널 프로필 이미지"
      />
    </Avatar>
  )
}

export default ChannelAvatar
