export interface Thumbnail {
  url: string
  width?: number
  height?: number
}

export interface YouTubeThumbnails {
  default?: Thumbnail
  high: Thumbnail
}

export interface YouTubeSnippet {
  title: string
  description: string
  thumbnails: YouTubeThumbnails
  channelId: string
  channelTitle: string
  publishedAt: string
}

export interface YouTubeStatistics {
  viewCount: string
}

// 기본 비디오 아이템 (홈 화면용)
export interface YouTubeVideoItem {
  id: string | { videoId: string }
  snippet: YouTubeSnippet
  statistics: YouTubeStatistics
}

// 검색 결과 비디오 아이템
export interface YouTubeSearchVideoItem {
  id: {
    videoId: string
  }
  snippet: YouTubeSnippet
}

// 검색 결과 플레이리스트 아이템
export interface YouTubeSearchPlaylistItem {
  id: {
    playlistId: string
  }
  snippet: YouTubeSnippet
}

// 채널 비디오 아이템
export interface YouTubeChannelVideoItem {
  id: {
    videoId: string
  }
  snippet: YouTubeSnippet
  statistics?: YouTubeStatistics
  channelInfo?: {
    snippet: {
      thumbnails: YouTubeThumbnails
    }
  }
}
