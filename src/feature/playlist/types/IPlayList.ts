export interface IPlaylistVideoItemProps {
  index: number
  thumbnailUrl: string
  title: string
  videoId: string
}

export interface IPlaylistHeaderProps {
  playlistTitle: string
  channelTitle: string
  videoCount: number
}

export interface IVideoItemProps {
  index: number
  thumbnailUrl: string
  title: string
  videoId: string
  views: number
  createdAt: string
}
