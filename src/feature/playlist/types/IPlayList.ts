export interface IVideo {
  id: string
  title: string
  thumbnailUrl: string
  views: number
  createdAt: string
}

export interface IPlayList {
  id: string
  title: string
  ownerName: string
  isPublic: boolean
  videos: IVideo[]
}

export interface IPlaylistVideoItemProps {
  video: IVideo
  index: number
}
