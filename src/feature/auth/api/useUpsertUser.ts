import { useMutation } from '@tanstack/react-query'
import { User } from '@supabase/supabase-js'
import { upsertAndFetchUser } from './upsertUserHelpers'

export const useUpsertUser = () => {
  return useMutation({
    mutationFn: async (user: User) => {
      return await upsertAndFetchUser(user)
    },
  })
}
