import UserChannel from '@/shared/components/user-channel/UserChannel'
import { useAuthStore } from '@/shared/store/auth/useAuthStore'
import TabMenu from './components/TebMenu'
import { useState } from 'react'
import { usePlayList } from './api/usePlaylistInfo'
import PlayListItem from './components/PlayLisyItem'
import UserNotFound from '../follow/components/UserNotFound'

const Channel = () => {
  const [selectedTab, setSelectedTab] = useState<`video` | `playlist`>('video')

  const user = useAuthStore((state) => state.user)
  const { data: playList, isLoading: playListLoading, error: playListError } = usePlayList(user?.id || 0)

  if (!user) return <UserNotFound />
  if (playListLoading || playListError || !playList) return <></>

  return (
    <article className="mx-[15px]">
      <UserChannel isMe channelName={user.channel_name} username={user.name} followers={user.follower} profileUrl={user.img} />

      <TabMenu onChangeTab={(tab) => setSelectedTab(tab)} />

      {selectedTab === 'video' && (
        <section className="flex h-[534px] flex-col items-center justify-center gap-[30px]">
          <img className="w-[150px]" src="image/download/video-not-found.svg" />
          <p className="text-[14px] text-gray-medium">아직 업로드된 영상이 없어요</p>
        </section>
      )}

      {selectedTab === 'playlist' &&

        (playList.length <= 0 ? (

          <section className="flex h-[534px] flex-col items-center justify-center gap-[30px]">
            <img className="w-[150px]" src="image/download/video-not-found.svg" />
            <p className="text-[14px] text-gray-medium">아직 생성된 플레이리스트가 없어요</p>
          </section>
        ) : (
          <ul>
            {playList?.map((item, index) => (
              <li key={index} className="flex h-[120px] justify-between gap-[15px]">
                <PlayListItem id={item.id} name={item.name} access={item.access} />
              </li>
            ))}
          </ul>
        ))}
    </article>
  )
}

export default Channel
