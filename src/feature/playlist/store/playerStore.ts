import { create } from 'zustand'
import { Video } from '../type/playlist'

interface PlayerState {
  currentVideo: Video | null
  playlist: Video[]
  setCurrentVideo: (video: Video) => void
  setPlaylist: (videos: Video[]) => void
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentVideo: null,
  playlist: [],
  setCurrentVideo: (video) => set({ currentVideo: video }),
  setPlaylist: (videos) => set({ playlist: videos }),
}))
