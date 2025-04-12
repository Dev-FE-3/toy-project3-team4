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

const usePlayListVideoInfo = (playListId: string, myself: boolean) => {
  return useQuery<IVideoItem[]>({
    queryKey: ['youtubePlaylistVideos', myself ? 'me' : 'yt', playListId],
    queryFn: async () => {
      const raw = await fetchYoutubePlayListVideoInfo(playListId)
      const items = raw.items as YouTubePlaylistItem[]
      return items.map((item) => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumbnailUrl: item.snippet.thumbnails.high.url,
        ownerName: item.snippet.videoOwnerChannelTitle,
      }))
    },
    enabled: !!playListId,
    staleTime: 1000 * 60 * 5,
  })
}

export default usePlayListVideoInfo
