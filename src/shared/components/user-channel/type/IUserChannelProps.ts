export default interface IUserChannelProps {
  isMe: boolean
  channelName: string
  username: string
  followers: number
  profileUrl: string
  isFollowing?: boolean // 팔로우 버튼 여부 제어
}
