// store/useAuthStore.ts
import { createDevtoolsStore } from '../createDevtoolsStore'
import IAuthState from './type/IAuthState'

export const useAuthStore = createDevtoolsStore<IAuthState>(
  (set) => ({
    user: null,
    user_id: null,
    setUser: (user) => set({ user }, false, 'setUser'),
    setUserId: (user_id) => set({ user_id }, false, 'setUserId'),
  }),
  'AuthStore',
)
