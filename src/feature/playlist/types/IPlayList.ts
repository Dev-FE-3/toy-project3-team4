// src/types/playlist.ts

export interface VideoItem {
  id: string
  title: string
  thumbnailUrl: string
  ownerName: string
}

export interface PlaylistProps {
  playlistId: string
  playlist: VideoItem[]
  currentIndex: number
  setCurrentIndex: (index: number) => void
  setIsFullOpen: (open: boolean) => void
}

export interface MiniModalProps {
  currentIndex: number
  playlist: VideoItem[]
  nextVideo?: VideoItem
  onOpenFull: () => void
}

export interface VideoItemProps {
  index: number
  thumbnailUrl: string
  title: string
  videoId: string
  isActive: boolean
  total: number
  onClick: () => void
}

export interface HeaderProps {
  playlistTitle: string
  channelTitle: string
  videoCount: number
  isPublic: boolean
  isMine: boolean
  onClose: () => void
}
