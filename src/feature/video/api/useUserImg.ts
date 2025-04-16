import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/shared/lib/supabase/supabaseClient'

// ✅ 유저의 이미지를 가져옴
const getUserInfo = async (id: number) => {
  const { data, error } = await supabase.from('users').select('img, name').eq('id', id).single()

  if (error) {
    console.error('유저 이미지 조회 실패:', error.message)
    return null
  }

  return [data.img, data.name]
}

export const useUserInfo = (userId: number) => {
  return useQuery({
    queryKey: ['userImg', userId],
    queryFn: () => getUserInfo(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  })
}
