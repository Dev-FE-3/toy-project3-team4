export function formatViewCount(count: number): string {
  if (count >= 100000000) {
    return `${Math.round(count / 100000000)}억`
  } else if (count >= 10000) {
    return `${Math.round(count / 10000)}만`
  } else if (count >= 1000) {
    return `${Math.round(count / 1000)}천`
  } else {
    return `${count}`
  }
}

export function formatLikeCount(count: number): string {
  if (count >= 1000) {
    return `1000+`
  }
  return `${count}`
}

export function formatTimeAgo(isoDate: string): string {
  const now = new Date()
  const past = new Date(isoDate)
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000)

  const units = [
    { label: '년', value: 60 * 60 * 24 * 365 },
    { label: '개월', value: 60 * 60 * 24 * 30 },
    { label: '일', value: 60 * 60 * 24 },
    { label: '시간', value: 60 * 60 },
    { label: '분', value: 60 },
  ]

  for (const unit of units) {
    const diff = Math.floor(seconds / unit.value)
    if (diff > 0) {
      return `${diff}${unit.label}전`
    }
  }
  return '방금전'
}
