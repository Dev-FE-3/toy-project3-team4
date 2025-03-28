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
      <h1 className="mt-10">margin top tailwind</h1>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserList
