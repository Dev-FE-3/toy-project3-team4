// src/playlist/components/PlaylistTestPage.tsx
import { useState } from 'react'
import { usePlaylistStore } from '../stores/usePlaylistStore.ts'
import { PlaylistMock } from '../mock/playlistMock'
import VideoDetailPage from './VideoDetailPage'

const PlaylistTestPage = () => {
  const [isOpened, setIsOpened] = useState(false)

  const open = () => {
    usePlaylistStore.getState().openPlaylist(PlaylistMock)
    setIsOpened(true)
  }

  return (
    <div className="p-4">
      {!isOpened && (
        <button onClick={open} className="rounded bg-blue-500 px-4 py-2 text-white">
          플레이리스트 테스트 열기
        </button>
      )}

      {isOpened && <VideoDetailPage />}
    </div>
  )
}

export default PlaylistTestPage
