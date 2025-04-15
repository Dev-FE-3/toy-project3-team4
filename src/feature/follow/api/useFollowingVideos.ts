import { useQueries } from '@tanstack/react-query'
import { fetchYoutubeChannel, fetchYoutubeChannelVideos, fetchYoutubeVideoInfo } from '@/shared/util/youtube'
import { FollowingChannel } from '../type/IFollowingTypes'
import { ChannelVideoItem, VideoInfoItem } from '../type/IChannelVideo'
import { useQuery } from '@tanstack/react-query'

const useFollowingVideos = (channels: FollowingChannel[]) => {
  // 1. 채널 정보 가져오기
  const channelQueries = useQueries({
    queries: channels.map((channel) => ({
      queryKey: ['channelInfo', channel.channel],
      queryFn: () => fetchYoutubeChannel(channel.channel),
      enabled: !!channel.channel,
      staleTime: 1000 * 60 * 5,
    })),
  })

  // 2. 각 채널의 비디오 목록 가져오기
  const videoQueries = useQueries({
    queries: channels.map((channel) => ({
      queryKey: ['channelVideo', channel.channel],
      queryFn: () => fetchYoutubeChannelVideos(channel.channel),
      enabled: !!channel.channel && channelQueries.every((query) => query.isSuccess),
      staleTime: 1000 * 60 * 5,
    })),
  })

  // 3. 모든 비디오 ID 수집
  const videoIds = videoQueries
    .map((query) => query.data?.items || [])
    .flat()
    .map((video) => video?.id.videoId)
    .filter(Boolean)

  // 4. 모든 비디오 정보 가져오기
  const { data: videoInfos, isLoading: isVideoInfoLoading } = useQuery({
    queryKey: ['videoInfos', videoIds],
    queryFn: () => fetchYoutubeVideoInfo(videoIds.join(',')),
    enabled: videoIds.length > 0 && videoQueries.every((query) => query.isSuccess),
    staleTime: 1000 * 60 * 5,
  })

  const isLoading = videoQueries.some((query) => query.isLoading) || channelQueries.some((query) => query.isLoading) || isVideoInfoLoading

  const isError = videoQueries.some((query) => query.isError) || channelQueries.some((query) => query.isError)

  // 5. 데이터 결합 및 정렬
  const data = videoQueries
    .map((query, index) => {
      if (!query.data?.items) return []
      const channelInfo = channelQueries[index].data?.items[0]

      return query.data.items.map((video: ChannelVideoItem) => {
        const videoInfo = videoInfos?.items?.find((info: VideoInfoItem) => info.id === video.id.videoId)

        return {
          ...video,
          snippet: {
            ...video.snippet,
            title: videoInfo?.snippet?.title || video.snippet.title,
          },
          channelInfo,
          statistics: videoInfo?.statistics || { viewCount: '0' },
        }
      })
    })
    .flat()
    .sort((a, b) => new Date(b.snippet?.publishedAt).getTime() - new Date(a.snippet?.publishedAt).getTime())

  return { data, isLoading, isError }
}

export default useFollowingVideos
