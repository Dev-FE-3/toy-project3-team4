import axiosInstance from '@/shared/lib/axios/axiosInstance'
import { useQuery } from '@tanstack/react-query'

const useViewHistory = () => {
  const fetchViewHistory = async () => {
    const response = await axiosInstance.get(`/view?select=*&order=created_at.desc`)

    return response.data
  }
  return useQuery({
    queryKey: ['view-history'],
    queryFn: fetchViewHistory,
  })
}

export default useViewHistory
