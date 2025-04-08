// stores/usePlaylistStore.ts
import { create } from 'zustand'
import { IPlayList } from '../types/IPlayList'

interface PlaylistState {
  current: IPlayList | null
  currentIndex: number
  isFullOpen: boolean
  openPlaylist: (playlist: IPlayList, startIndex?: number) => void
  setCurrentIndex: (index: number) => void
  toggleFullModal: (state?: boolean) => void
  close: () => void
}

export const usePlaylistStore = create<PlaylistState>((set) => ({
  current: null,
  currentIndex: 0,
  isFullOpen: false,
  openPlaylist: (playlist, startIndex = 0) => set({ current: playlist, currentIndex: startIndex, isFullOpen: true }),
  setCurrentIndex: (index) => set({ currentIndex: index }),
  toggleFullModal: (state) => set((s) => ({ isFullOpen: typeof state === 'boolean' ? state : !s.isFullOpen })),
  close: () => set({ isFullOpen: false }),
}))
