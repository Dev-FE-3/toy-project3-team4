import { supabase } from '@/shared/lib/supabase/supabaseClient'
import { IPlayList } from '../types/IPlayList'

export const fetchPlaylistByName = async (userId: number, name: string): Promise<IPlayList> => {
  const { data, error } = await supabase.from('playlist').select('*').eq('user_id', userId).eq('name', name).order('order', { ascending: true })

  if (error || !data) throw new Error('플레이리스트 불러오기 실패')

  // 유튜브 API 연동을 통해 추가 정보 채워넣기
  const videos = await Promise.all(
    data.map(async (item) => {
      const res = await fetch(`/api/youtube/videos?part=snippet,statistics&id=${item.video_id}&key=${import.meta.env.VITE_YOUTUBE_KEY}`)
      const json = await res.json()
      const video = json.items[0]

      return {
        id: item.video_id,
        title: video.snippet.title,
        thumbnailUrl: video.snippet.thumbnails.high.url,
        views: parseInt(video.statistics.viewCount),
        createdAt: item.created_at,
      }
    }),
  )

  return {
    id: String(data[0].id),
    title: name,
    ownerName: '사용자 이름 (나중에 user 테이블에서 받아오기)', // 임시
    isPublic: data[0].access,
    videos,
  }
}
