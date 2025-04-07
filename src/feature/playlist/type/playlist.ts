export interface Video {
  id: string
  title: string
  thumbnailUrl: string
  views: number
  createdAt: string
}

export interface Playlist {
  id: string
  title: string
  isMyPlaylist: boolean
  isPublic: boolean
  authorName: string
  videos: Video[]
}
