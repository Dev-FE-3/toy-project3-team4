import { YouTubeVideoItem } from '@/shared/type/IYouTubeTypes'

export interface VideoItemProps {
  item: YouTubeVideoItem
  onVideoSelect: (id: string) => void
}
