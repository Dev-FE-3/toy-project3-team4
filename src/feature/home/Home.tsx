import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/shared/lib/axios/axiosInstance'

export interface User {
  id: number
  name: string
}

const fetchUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get('/users')
  return response.data
}

const UserList: React.FC = () => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  if (isLoading) return <p>Loading...</p>
  if (error instanceof Error) return <p>{error.message}</p>

  return (
    <div>
      <h1 className="mt-10 p-8">margin top tailwind</h1>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <h1 className="font-black text-4xl">🚀 Tailwind + Pretendard Variable</h1>
        <p className="font-light text-lg mt-4">이 텍스트는 Light (300)입니다.</p>
        <p className="font-normal text-lg">이 텍스트는 Regular (400)입니다.</p>
        <p className="font-medium text-lg">이 텍스트는 Medium (500)입니다.</p>
        <p className="font-bold text-lg">이 텍스트는 Bold (700)입니다.</p>
        <p className="font-black text-lg">이 텍스트는 Black (900)입니다.</p>
      </div>
    </div>
  )
}

export default UserList
