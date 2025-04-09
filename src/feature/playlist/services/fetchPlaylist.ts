// services/fetchPlaylist.ts
import { getPlaylistVideos, getPlaylistMeta } from '../api/usePlayList'
import { fetchYoutubeVideoInfo } from '@/shared/util/youtube'
import { IPlayList } from '../types/IPlayList'

export const fetchPlaylistById = async (playlistId: string): Promise<IPlayList> => {
  const [videoItems, meta] = await Promise.all([getPlaylistVideos(playlistId), getPlaylistMeta(playlistId)])

  const videos = await Promise.all(
    videoItems.map(async (item) => {
      const res = await fetchYoutubeVideoInfo(item.video_id)
      const video = res.items[0]

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
    title: meta.name,
    ownerName: '내 계정 이름 또는 유튜브 계정 이름', // 나중에 보강 가능
    isPublic: meta.access,
    videos,
  }
}
