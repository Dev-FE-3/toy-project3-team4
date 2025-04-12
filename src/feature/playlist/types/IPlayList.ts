export interface IVideoItem {
  id: string
  title: string
  thumbnailUrl: string
  ownerName: string
}

export interface IMiniModalProps {
  playlist: IVideoItem[]
  onOpenFull: () => void
}

export interface IVideoItemProps {
  thumbnailUrl: string
  title: string
  videoId: string
  views?: number | null
  createdAt?: string | null
}

// 이미 정의된 IVideoItemProps 기반으로 views, createdAt 제외한 타입
// src/types/playlist.ts

export type TVideoItemContainerProps = Omit<IVideoItemProps, 'views' | 'createdAt'>

export interface IPlaylistHeaderProps {
  playlistTitle: string
  channelTitle: string
  myself: boolean
  isPublic: boolean
  onClose: () => void
}
