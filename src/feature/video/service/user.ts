import { supabase } from '@/shared/lib/supabase/supabaseClient'

export const getUserImg = async (id: number): Promise<string | null> => {
  const { data, error } = await supabase.from('users').select('img').eq('id', id).single()

  if (error) {
    console.error('유저 이미지 조회 실패:', error.message)
    return null
  }
  return data?.img ?? null
}
