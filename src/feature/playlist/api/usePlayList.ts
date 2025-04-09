import { supabase } from '@/shared/lib/supabase/supabaseClient'

export const getPlaylistVideos = async (playlistId: string) => {
  const { data, error } = await supabase.from('videolist').select('*').eq('playlist_id', playlistId).order('created_at', { ascending: true })

  if (error || !data) throw new Error('플레이리스트 영상 불러오기 실패')
  return data
}

export const getPlaylistMeta = async (playlistId: string) => {
  const { data, error } = await supabase.from('playlist').select('name, user_id, access').eq('id', playlistId).single()

  if (error || !data) throw new Error('플레이리스트 메타데이터 없음')
  return data
}
