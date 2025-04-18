import { Dispatch, SetStateAction } from 'react'

export interface IVideoItem {
  id: string
  title: string
  thumbnailUrl: string
  ownerName: string
}

export interface IMiniModalProps {
  videoId: string
  playList: IVideoItem[]
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
  playList: IVideoItem[]
  playListInfo: {
    title: string
    channelTitle: string
    id: string
  }
  myself: boolean
  setIsFullOpen: Dispatch<SetStateAction<boolean>>
}
