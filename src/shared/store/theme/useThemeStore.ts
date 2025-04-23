// store/useThemeStore.ts
import { createDevtoolsStore } from '../createDevtoolsStore'
import { IThemeState } from './type/IThemeState'

const useThemeStore = createDevtoolsStore<IThemeState>(
  (set) => ({
    isDark: false,
    setToggleTheme: () =>
      set(
        (state) => {
          const newTheme = !state.isDark
          if (newTheme) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
          return { isDark: newTheme }
        },
        false,
        'setToggleTheme',
      ),
  }),
  'ThemeStore',
)

export default useThemeStore
