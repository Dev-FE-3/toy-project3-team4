import { useAuthStore } from '@/shared/store/auth/useAuthStore'
import FollowingList from './components/FollowingList'
import UserNotFound from './components/UserNotFound'
import FollowingFeed from './components/FollowingFeed'
import { useFollowingChannels } from './api/useFollowingChannels'
import EmptyFollowing from './components/EmptyFollowing'

const Follow = () => {
  const user = useAuthStore((state) => state.user)
  const { data } = useFollowingChannels(user?.id || 0)

  if (!user) {
    return <UserNotFound />
  }

  if (!data || data.length === 0) return <EmptyFollowing />

  return (
    <>
      <FollowingList channels={data} />
      <FollowingFeed channels={data} />
    </>
  )
}

export default Follow
