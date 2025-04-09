import { useEffect } from 'react'

interface UseInfiniteScrollProps {
  isFetchingNextPage: boolean
  hasNextPage: boolean | undefined
  fetchNextPage: () => void
}

export const useInfiniteScroll = ({ isFetchingNextPage, hasNextPage, fetchNextPage }: UseInfiniteScrollProps) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const clientHeight = window.innerHeight

      if (scrollHeight - scrollTop <= clientHeight && !isFetchingNextPage && hasNextPage) {
        fetchNextPage()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isFetchingNextPage, hasNextPage, fetchNextPage])
}
