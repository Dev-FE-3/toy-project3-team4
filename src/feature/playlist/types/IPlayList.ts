// src/types/playlist.ts

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
  isActive: boolean
  views?: number | null
  createdAt?: string | null
  onClick: () => void
}

// 이미 정의된 IVideoItemProps 기반으로 views, createdAt 제외한 타입
// src/types/playlist.ts

export type TVideoItemContainerProps = Omit<IVideoItemProps, 'views' | 'createdAt'>

export interface IPlaylistHeaderProps {
  playlistTitle: string
  channelTitle: string
  videoCount: number
  currentIndex: number
  myself: boolean
  isPublic: boolean
  onClose: () => void
}
