import { create } from 'zustand'
import { IThemeState } from './type/IThemeState'

// Zustand 스토어 생성
const useThemeStore = create<IThemeState>((set) => ({
  isDark: false,
  toggleTheme: () =>
    set((state) => {
      const newTheme = !state.isDark
      if (newTheme) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      return { isDark: newTheme }
    }),
}))

export default useThemeStore
