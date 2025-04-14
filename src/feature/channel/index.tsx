import UserChannel from '@/shared/components/user-channel/UserChannel'
import { useAuthStore } from '@/shared/store/auth/useAuthStore'
import { useSearchParams } from 'react-router-dom'
import TabMenu from './components/TebMenu'
import { useState } from 'react'
import { usePlayList } from './api/usePlaylistInfo'
import PlayListItem from './components/PlayLisyItem'

const Channel = () => {
  const [selectedTab, setSelectedTab] = useState<`video` | `playlist`>('video')

  const user = useAuthStore((state) => state.user)

  const { data: playList, isLoading: playListLoading, error: playListError } = usePlayList(user.id)

  if (playListLoading) return <div>Loading...</div>
  if (playListError) return <div>Error</div>
  if (!user) return null

  return (
    <main className="mx-[15px]">
      <section>
        <UserChannel isMe channelName={user.channel_name} username={user.name} followers={user.follower} profileUrl={user.img} />
      </section>
      <section className="mb-[15px]">
        <TabMenu onChangeTab={(tab) => setSelectedTab(tab)} />
      </section>
      <section>
        {selectedTab === 'video' && <p className="flex justify-center">업로드된 영상이 없습니다.</p>}

        {selectedTab === 'playlist' && (
          <ul>
            {playList?.map((item) => (
              <li key={item.id}>
                <PlayListItem id={item.id} name={item.name} access={item.access} created_at={item.created_at} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default Channel
