import axiosInstance from '@/shared/lib/axios/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import { User } from '@supabase/supabase-js' // ✅ Supabase User 타입 가져오기

// ✅ UID로 사용자 조회
const fetchUserByUid = async (uid: string) => {
  const { data } = await axiosInstance.get(`/users?uid=eq.${uid}`)
  return data
}

// ✅ 사용자 삽입
const insertUser = async (user: User) => {
  // ✅ User 타입 적용
  await axiosInstance.post(`/users`, {
    uid: user.id, // Supabase Auth의 UUID
    img: '/public/image/profile/myself.png',
    name: user.user_metadata?.full_name || '아이유팬1호', // 기본 이름 설정
    follower: 14421,
  })
}

// ✅ React Query Mutation Hook
export const useUpsertUser = () => {
  return useMutation({
    mutationFn: async (user: User) => {
      // ✅ User 타입 적용
      const existingUser = await fetchUserByUid(user.id)
      if (existingUser.length === 0) {
        await insertUser(user)
      }
    },
  })
}
