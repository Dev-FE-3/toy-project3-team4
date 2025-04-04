import { create } from 'zustand'
import IAuthState from './type/IAuthState'

export const useAuthStore = create<IAuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))
