import { supabase } from '@/shared/lib/supabase/supabaseClient'

// ✅ 현재 영상의 좋아요 수를 받아옴
export const getLikeCount = async (videoId: string): Promise<number> => {
  const { count, error } = await supabase.from('like').select('*', { count: 'exact', head: true }).eq('video_id', videoId)

  if (error) {
    console.log('좋아요 수 가져오기 실패', error)
    return 0
  }
  return count ?? 0
}

// ✅ 슈퍼베이스에 유저가 해당 비디오에 좋아요를 눌렀는지 확인
export const hasUserLiked = async (videoId: string, userId: number) => {
  const { data, error } = await supabase.from('like').select('*').eq('video_id', videoId).eq('user_id', userId)
  if (error) throw error
  return data.length > 0
}

// ✅ 슈퍼베이스에 like 테이블에  videoId , userId 포함한 새로운 row를 추가
export const likeVideo = async (videoId: string, userId: number) => {
  const { error } = await supabase.from('like').insert([{ video_id: videoId, user_id: userId }])
  if (error) throw error
}

// ✅ 슈퍼베이스에 like 테이블에 저장된 videoId , userId row를 삭제
export const unlikeVideo = async (videoId: string, userId: number) => {
  const { error } = await supabase.from('like').delete().eq('video_id', videoId).eq('user_id', userId)
  if (error) throw error
}
