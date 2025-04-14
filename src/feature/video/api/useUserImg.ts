import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/shared/lib/supabase/supabaseClient'

export const useUserImg = (userId: number) => {
  return useQuery({
    queryKey: ['userImg', userId],
    queryFn: () => getUserImg(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  })
}

// ✅ 유저의 이미지를 가져옴
const getUserImg = async (id: number): Promise<string | null> => {
  const { data, error } = await supabase.from('users').select('img').eq('id', id).single()

  if (error) {
    console.error('유저 이미지 조회 실패:', error.message)
    return null
  }
  return data?.img ?? null
}
