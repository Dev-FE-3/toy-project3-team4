// 조회수 포맷팅 (예: 1234567 -> 123.4만회)
export const formatViewCount = (viewCount: string) => {
  const count = parseInt(viewCount)
  if (count >= 100000000) {
    return `${(count / 100000000).toFixed(1)}억회`
  }
  if (count >= 10000) {
    return `${(count / 10000).toFixed(1)}만회`
  }
  return `${count.toLocaleString()}회`
}

// 좋아요 수 포맷팅 (1000+ 형식)
export const formatLikeCount = (likeCount: string) => {
  const count = parseInt(likeCount)
  if (count >= 1000) {
    return '1000+'
  }
  return count.toString()
}

// 구독자 수 포맷팅 (유튜브 스타일)
export const formatSubscriberCount = (subscriberCount: string) => {
  const count = parseInt(subscriberCount)
  if (count >= 10000000) {
    return `${(count / 10000000).toFixed(1)}천만명`
  }
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}백만명`
  }
  if (count >= 10000) {
    return `${(count / 10000).toFixed(1)}만명`
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}천명`
  }
  return count.toString()
}

// 업로드 시간 포맷팅
export const formatUploadDate = (publishedAt: string) => {
  const uploadDate = new Date(publishedAt)
  const now = new Date()
  const diffMs = now.getTime() - uploadDate.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)
  const diffMonth = Math.floor(diffDay / 30)
  const diffYear = Math.floor(diffDay / 365)

  if (diffYear > 0) return `${diffYear}년 전`
  if (diffMonth > 0) return `${diffMonth}개월 전`
  if (diffDay > 0) return `${diffDay}일 전`
  if (diffHour > 0) return `${diffHour}시간 전`
  if (diffMin > 0) return `${diffMin}분 전`
  return '방금 전'
}
