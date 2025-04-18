import { create } from 'zustand'

interface PlayListModalState {
  isPlayListOpen: boolean
  isNewPlayListOpen: boolean
  openPlayList: () => void
  closePlayList: () => void
  openNewPlayList: () => void
  closeNewPlayList: () => void
  switchToNewPlayList: () => void
  switchToPlayList: () => void
}

export const usePlayListModalStore = create<PlayListModalState>((set) => ({
  isPlayListOpen: false,
  isNewPlayListOpen: false,
  openPlayList: () => set({ isPlayListOpen: true }),
  closePlayList: () => set({ isPlayListOpen: false }),
  openNewPlayList: () => set({ isNewPlayListOpen: true }),
  closeNewPlayList: () => set({ isNewPlayListOpen: false }),
  switchToNewPlayList: () => set({ isPlayListOpen: false, isNewPlayListOpen: true }),
  switchToPlayList: () => set({ isPlayListOpen: true, isNewPlayListOpen: false }),
}))
