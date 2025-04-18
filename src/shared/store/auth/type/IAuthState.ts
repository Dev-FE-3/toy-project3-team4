import { User } from '@supabase/supabase-js'

interface ISupabaseTableUser {
  id: number
  created_at: string
  name: string
  channel_name: string
  uid: string
  follower: number
  img: string
  provider: string
}

export default interface IAuthState {
  auth: User | null
  user: ISupabaseTableUser | null
  setAuth: (auth: User) => void
  setUser: (user: ISupabaseTableUser) => void
}
