import axiosInstance from '@/shared/lib/axios/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import { User } from '@supabase/supabase-js'
import { useAuthStore } from '@/shared/store/auth/useAuthStore'

// ✅ UID로 사용자 조회
const fetchUserByUid = async (uid: string) => {
  const { data } = await axiosInstance.get(`/users?uid=eq.${uid}`)
  return data
}

// ✅ 사용자 삽입
const insertUser = async (user: User) => {
  await axiosInstance.post(`/users`, {
    uid: user.id,
    img: user.user_metadata.avatar_url,
    name: user.user_metadata?.full_name || '아이유팬1호',
    follower: 14421,
    provider: user.app_metadata.provider,
  })
}

// ✅ React Query Mutation Hook
export const useUpsertUser = () => {
  const setUser = useAuthStore((state) => state.setUser)

  return useMutation({
    mutationFn: async (user: User) => {
      const existingUser = await fetchUserByUid(user.id)

      if (existingUser.length === 0) {
        await insertUser(user)
      }

      // ✅ 기존이든 신규든 다시 조회해서 user_id 가져옴
      const users = await fetchUserByUid(user.id)
      if (users.length > 0) {
        setUser(users[0])
      }
    },
  })
}
