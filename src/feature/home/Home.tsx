import React from 'react'
import { useYoutubeVideoInfo } from '@/shared/util/youtube'
import { useUserList } from './api/useUserList'

const UserList: React.FC = () => {
  const { data: users, isLoading: isUsersLoading, error: userError } = useUserList()
  const { data: video, isLoading: isVideoLoading, error: videoError } = useYoutubeVideoInfo('60YQrsnduUc')

  if (isUsersLoading || isVideoLoading) return <p>Loading...</p>
  if (userError instanceof Error) return <p>{userError.message}</p>
  if (videoError instanceof Error) return <p>{videoError.message}</p>

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="mt-10 p-8">Supabase 연동</h1>
      <ul>
        {users?.map((user) => (
          <li className="font-black text-4xl" key={user.id}>
            {user.name}
          </li>
        ))}
      </ul>
      <h1 className="mt-10 p-8">Youtube API 연동</h1>
      <ul>
        <li>ID: {video.items[0].id}</li>
        <li>TITLE: {video.items[0].snippet.localized.title}</li>
        <li>DESCRIPTION: {video.items[0].snippet.localized.description}</li>
        <li>IMG URL: {video.items[0].snippet.thumbnails.standard.url}</li>
      </ul>
    </div>
  )
}

export default UserList
