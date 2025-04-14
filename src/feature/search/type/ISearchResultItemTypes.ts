export interface YouTubeSearchVideoItem {
  id: {
    videoId: string
  }
  snippet: {
    title: string
    description: string
    thumbnails: {
      high: {
        url: string
      }
    }
    channelId: string
    channelTitle: string
    publishedAt: string
  }
}

export interface YouTubeSearchPlaylistItem {
  id: {
    playlistId: string
  }
  snippet: {
    title: string
    description: string
    thumbnails: {
      high: {
        url: string
      }
    }
    channelId: string
    channelTitle: string
    publishedAt: string
  }
}
