import { useQuery } from '@tanstack/react-query'
import { fetchYoutubePlayListVideoInfo, fetchYoutubeVideoInfo } from '@/shared/util/youtube'
import { IVideoItem } from '../types/IPlayList'
import axiosInstance from '@/shared/lib/axios/axiosInstance'

type SupabaseVideoItem = {
  video_id: string
}

type YouTubePlaylistItem = {
  snippet: {
    resourceId: { videoId: string }
    title: string
    thumbnails: { high: { url: string } }
    videoOwnerChannelTitle: string
  }
}

const fetchSupabaseVideo = async (playListId: string) => {
  const result = await axiosInstance.get(`/videolist`, {
    params: {
      playlist_id: `eq.${playListId}`,
    },
  })

  const videoInfo = await Promise.all(result.data.map((item: SupabaseVideoItem) => fetchYoutubeVideoInfo(item.video_id)))

  return videoInfo
}

const usePlayListVideoInfo = (playListId: string, myself: boolean) => {
  return useQuery<IVideoItem[]>({
    queryKey: ['youtubePlaylistVideos', myself ? 'me' : 'yt', playListId],
    queryFn: async () => {
      if (myself) {
        const videoInfo = await fetchSupabaseVideo(playListId)
        return videoInfo.map((info) => {
          const item = info.items[0]
          return {
            id: item.id,
            title: item.snippet.title,
            thumbnailUrl: item.snippet.thumbnails.high.url || '/public/image/default/empty.png',
            ownerName: item.snippet.channelTitle,
          }
        })
      } else {
        const raw = await fetchYoutubePlayListVideoInfo(playListId)
        const items = raw.items as YouTubePlaylistItem[]
        return items.map((item) => ({
          id: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          thumbnailUrl: item.snippet.thumbnails?.high?.url ?? '/public/image/default/empty.png',
          ownerName: item.snippet.videoOwnerChannelTitle,
        }))
      }
    },
    enabled: !!playListId,
    staleTime: 1000 * 60 * 5,
  })
}

export default usePlayListVideoInfo
