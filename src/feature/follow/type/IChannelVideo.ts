import { YouTubeChannelVideoItem } from '@/shared/type/IYouTubeTypes'

export interface ChannelVideoResponse {
  items: YouTubeChannelVideoItem[]
}

export interface VideoInfoItem {
  id: string
  statistics: {
    viewCount: string
  }
}

export type { YouTubeChannelVideoItem as ChannelVideoItem }
