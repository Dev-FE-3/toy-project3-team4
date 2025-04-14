import { useEffect } from 'react'

interface UseInfiniteScrollProps {
  hasNextPage: boolean | undefined
  isLoading?: boolean
  isFetchingNextPage?: boolean
  onLoadMore: () => void
}

export const useInfiniteScroll = ({ hasNextPage, isLoading = false, isFetchingNextPage = false, onLoadMore }: UseInfiniteScrollProps) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const clientHeight = window.innerHeight

      // 스크롤이 바닥에 도달했고, 로딩/페칭 중이 아니며, 다음 페이지가 있을 때
      if (scrollHeight - scrollTop <= clientHeight && !isLoading && !isFetchingNextPage && hasNextPage) {
        onLoadMore()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasNextPage, isLoading, isFetchingNextPage, onLoadMore])
}
