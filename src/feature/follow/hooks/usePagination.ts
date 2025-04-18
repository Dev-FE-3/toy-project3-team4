import { useState, useMemo } from 'react'

interface UsePaginationOptions<T> {
  data: T[]
  itemsPerPage: number
}

interface PaginationResult<T> {
  currentData: T[]
  currentPage: number
  hasNextPage: boolean
  loadMore: () => void
}

export const usePagination = <T>({ data, itemsPerPage }: UsePaginationOptions<T>): PaginationResult<T> => {
  const [currentPage, setCurrentPage] = useState(1)

  const currentData = useMemo(() => {
    const start = 0
    const end = currentPage * itemsPerPage
    return data.slice(start, end)
  }, [data, currentPage, itemsPerPage])

  const hasNextPage = currentData.length < data.length

  const loadMore = () => {
    setCurrentPage((prev) => prev + 1)
  }

  return {
    currentData,
    currentPage,
    hasNextPage,
    loadMore,
  }
}
