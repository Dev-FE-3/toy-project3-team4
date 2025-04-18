import UserChannel from '@/shared/components/user-channel/UserChannel'
import Settings from './components/Settings'
import ViewHistory from './components/ViewHistory'
import { useAuthStore } from '@/shared/store/auth/useAuthStore'
import UserNotFound from '../follow/components/UserNotFound'

const AppSettings = () => {
  const user = useAuthStore((state) => state.user)

  if (!user) return <UserNotFound />

  return (
    <section className="ml-[15px] mr-[15px]">
      {/* 내 채널 정보 */}
      <UserChannel isMe channelName={user.channel_name} username={user.name} followers={user.follower} profileUrl={user.img} />
      {/* 시청기록 */}
      <ViewHistory />
      {/* 설정 */}
      <Settings />
    </section>
  )
}

export default AppSettings
