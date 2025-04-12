import { useQuery } from '@tanstack/react-query'
import { fetchYoutubePlayListVideoInfo } from '@/shared/util/youtube'
import { IVideoItem } from '../types/IPlayList'

type YouTubePlaylistItem = {
  snippet: {
    resourceId: { videoId: string }
    title: string
    thumbnails: { high: { url: string } }
    videoOwnerChannelTitle: string
  }
}

const useYoutubePlayListVideoInfo = (playlistId: string) => {
  return useQuery<IVideoItem[]>({
    queryKey: ['youtubePlaylistVideos', playlistId],
    queryFn: async () => {
      const raw = await fetchYoutubePlayListVideoInfo(playlistId)
      const items = raw.items as YouTubePlaylistItem[]
      return items.map((item) => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumbnailUrl: item.snippet.thumbnails.high.url,
        ownerName: item.snippet.videoOwnerChannelTitle,
      }))
    },
    enabled: !!playlistId,
    staleTime: 1000 * 60 * 5,
  })
}

export default useYoutubePlayListVideoInfo
