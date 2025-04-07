export interface YouTubeItem {
  id: string
  snippet: {
    channelId: string
    channelTitle: string
    publishedAt: string
    title: string
    description: string
    thumbnails: {
      high: { url: string }
    }
  }
  statistics: {
    viewCount: string
  }
}

export interface VideoItemProps {
  item: YouTubeItem
}
