export interface YouTubePlaylistItem {
  id: {
    playlistId: string
  }
  snippet: {
    publishedAt: string
    channelId: string
    title: string
    description: string
    thumbnails: {
      default: {
        url: string
        width: number
        height: number
      }
      medium: {
        url: string
        width: number
        height: number
      }
      high: {
        url: string
        width: number
        height: number
      }
    }
    channelTitle: string
    publishTime: string
  }
}

export interface PlaylistVideoItem {
  snippet: {
    resourceId: {
      videoId: string
    }
  }
}

export interface PlaylistItemProps {
  item: YouTubePlaylistItem
}

export interface PlaylistVideoResponse {
  items: PlaylistVideoItem[]
}
