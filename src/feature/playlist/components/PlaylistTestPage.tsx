// src/playlist/components/PlaylistTestPage.tsx
import { useState } from 'react'
import { usePlaylistStore } from '@/shared/store/usePlaylistStore'
import { PlaylistMock } from '../mock/PlaylistMock'
import VideoDetailPage from './VideoDetailPage'

const PlaylistTestPage = () => {
  const [isOpened, setIsOpened] = useState(false)

  const open = () => {
    usePlaylistStore.getState().openPlaylist(PlaylistMock)
    setIsOpened(true)
  }

  return (
    <div>
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
