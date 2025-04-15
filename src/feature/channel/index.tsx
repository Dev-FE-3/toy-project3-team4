import UserChannel from '@/shared/components/user-channel/UserChannel'
import { useAuthStore } from '@/shared/store/auth/useAuthStore'
import TabMenu from './components/TebMenu'
import { useState } from 'react'
import { usePlayList } from './api/usePlaylistInfo'
import PlayListItem from './components/PlayLisyItem'

const Channel = () => {
  const [selectedTab, setSelectedTab] = useState<`video` | `playlist`>('video')

  const user = useAuthStore((state) => state.user)
  const { data: playList, isLoading: playListLoading, error: playListError } = usePlayList(user.id)

  if (!user) return console.log('유저 정보가 없어요')
  if (playListLoading) return <></>
  if (playListError) return <></>

  return (
    <article className="mx-[15px]">
      <UserChannel isMe channelName={user.channel_name} username={user.name} followers={user.follower} profileUrl={user.img} />

      <TabMenu onChangeTab={(tab) => setSelectedTab(tab)} />

      {selectedTab === 'video' && <p className="flex justify-center">업로드된 영상이 없습니다.</p>}

      {selectedTab === 'playlist' && (
        <ul>
          {playList?.map((item) => (
            <PlayListItem id={item.id} name={item.name} access={item.access} created_at={item.created_at} count={playList?.length} />
          ))}
        </ul>
      )}
    </article>
  )
}

export default Channel
