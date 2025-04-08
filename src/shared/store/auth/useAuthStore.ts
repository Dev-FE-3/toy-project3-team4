// store/useAuthStore.ts
import { createDevtoolsStore } from '../createDevtoolsStore'
import IAuthState from './type/IAuthState'

export const useAuthStore = createDevtoolsStore<IAuthState>(
  (set) => ({
    auth: null,
    user: null,
    setAuth: (auth) => set({ auth }, false, 'setAuth'),
    setUser: (user) => set({ user }, false, 'setUser'),
  }),
  'AuthStore',
)
