import { Dispatch, SetStateAction } from 'react'

export interface IVideoItem {
  id: string
  title: string
  thumbnailUrl: string
  ownerName: string
}

export interface IMiniModalProps {
  videoId: string
  playlist: IVideoItem[]
  onOpenFull: () => void
}

export interface IVideoItemProps {
  videoId: string
  title: string
  thumbnailUrl: string
  views?: number | null
  createdAt?: string | null
}

export interface IPlaylistHeaderProps {
  playlistTitle: string
  channelTitle: string
  myself: boolean
  isPublic: boolean
  onClose: () => void
}

export interface IPlaylistFullModalProps {
  playlist: {
    id: string
    title: string
    thumbnailUrl: string
  }[]
  playlistInfo: {
    items: {
      id: string
      snippet: {
        title: string
        channelTitle: string
      }
    }[]
  }
  myself: boolean
  setIsFullOpen: Dispatch<SetStateAction<boolean>>
}
