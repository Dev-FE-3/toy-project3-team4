import { User } from '@supabase/supabase-js'

export default interface IAuthState {
  user: User | null
  user_id: number | null
  setUser: (user: User) => void
  setUserId: (id: number) => void
}
