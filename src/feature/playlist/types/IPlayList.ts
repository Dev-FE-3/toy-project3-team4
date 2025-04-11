// src/types/playlist.ts

export interface IVideoItem {
  id: string
  title: string
  thumbnailUrl: string
  ownerName: string
}
export interface ILocalPlaylist {
  id: number
  name: string
  user_id: string // Supabase row owner
  uid: string // 사용자 uid (auth.users.id)
  access: boolean
  created_at: string
}

export interface ILocalVideoItem {
  id: number
  video_id: string
  playlist_id: number
  created_at: string
}

export interface IPlaylistProps {
  playlistInfo: string
  myself: boolean
  playlist: IVideoItem[]
  currentIndex: number
  setCurrentIndex: (index: number) => void
  setIsFullOpen: (open: boolean) => void
}

export interface IMiniModalProps {
  currentIndex: number
  playlist: IVideoItem[]
  nextVideo?: IVideoItem
  onOpenFull: () => void
}

export interface IVideoItemProps {
  index: number
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
