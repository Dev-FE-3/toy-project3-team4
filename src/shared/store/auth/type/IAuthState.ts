import { User } from '@supabase/supabase-js'

interface IAuthState {
  user: User | null
  setUser: (user: User | null) => void
}

export default IAuthState
