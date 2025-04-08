// services/fetchPlaylist.ts
import { supabase } from '@/shared/lib/supabase/supabaseClient'
import { IPlayList } from '../types/IPlayList'

export const fetchPlaylistById = async (playlistId: string): Promise<IPlayList> => {
  const { data, error } = await supabase.from('videolist').select('*').eq('playlist_id', playlistId).order('created_at', { ascending: true })

  if (error || !data) throw new Error('플레이리스트 불러오기 실패')

  const playlistMeta = await supabase.from('playlist').select('name, user_id, access').eq('id', playlistId).single()

  if (playlistMeta.error || !playlistMeta.data) throw new Error('메타데이터 없음')

  const videos = await Promise.all(
    data.map(async (item) => {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${item.video_id}&key=${import.meta.env.VITE_YOUTUBE_KEY}`,
      )
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
    id: playlistId,
    title: playlistMeta.data.name,
    ownerName: '내 계정 이름 또는 유튜브 계정 이름', // 후처리 가능
    isPublic: playlistMeta.data.access,
    videos,
  }
}
