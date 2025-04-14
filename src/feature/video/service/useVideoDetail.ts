import { useYoutubeChannel } from '../api/useYoutubeChannel'
import { useYoutubeVideoInfo } from '../api/useYoutubeVideoInfo'

export const useVideoDetail = (videoId: string) => {
  const { data: videoData, isLoading: isVideoLoading, error: videoError } = useYoutubeVideoInfo(videoId)

  const channelId = videoData?.items?.[0]?.snippet?.channelId

  const { data: channelData, isLoading: isChannelLoading, error: channelError } = useYoutubeChannel(channelId)

  const isLoading = isVideoLoading || isChannelLoading
  const error = videoError || channelError

  const video = videoData?.items?.[0]
  const channel = channelData?.items?.[0]

  const result =
    video && channel
      ? {
          title: video.snippet.localized.title,
          img: video.snippet.thumbnails.medium.url,
          viewCount: Number(video.statistics.viewCount),
          publishedAt: video.snippet.publishedAt,
          channelId: channelId,
          channelTitle: video.snippet.channelTitle,
          channelImg: channel.snippet.thumbnails.default.url,
        }
      : null

  return { data: result, isLoading, error }
}
