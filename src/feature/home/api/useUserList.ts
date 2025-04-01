import axiosInstance from '@/shared/lib/axios/axiosInstance'
import { IUser } from '../type/IUser'
import { useQuery } from '@tanstack/react-query'

const fetchUsers = async (): Promise<IUser[]> => {
  const response = await axiosInstance.get('/users')
  return response.data
}

export const useUserList = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })
}
