import axiosInstance from '@/shared/lib/axios/axiosInstance'
import { User } from '@supabase/supabase-js'

export const fetchUserByUid = async (uid: string) => {
  const { data } = await axiosInstance.get(`/users?uid=eq.${uid}`)
  return data
}

export const insertUser = async (user: User) => {
  await axiosInstance.post(`/users`, {
    uid: user.id,
    img: user.user_metadata.avatar_url,
    name: user.user_metadata?.full_name || '아이유팬1호',
    follower: 14421,
    provider: user.app_metadata.provider,
  })
}

export const upsertAndFetchUser = async (user: User) => {
  const existingUser = await fetchUserByUid(user.id)

  if (existingUser.length === 0) {
    await insertUser(user)
  }

  const users = await fetchUserByUid(user.id)
  return users[0]
}
